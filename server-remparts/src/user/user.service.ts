import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cart, Invoice, Order, Payment, Prisma, User } from '@prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { chunkArray, isDev } from 'src/lib/utils';
import { ConfigService } from '@nestjs/config';
import { messagesFromServer } from 'src/config/messagesFromServer';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSettlementsDto } from './dto/update-user-settlements.dto';
import Redis from 'ioredis';
import { UserWithSettlementsAndOrder } from './types/UserFull';

@Injectable()
export class UserService {
  private readonly redisKey_AllUsers: string;
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly configService: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    this.redisKey_AllUsers = 'users_all';
  }

  async createUser(
    data: Pick<User, 'email'> & Partial<Omit<User, 'email'>>,
  ): Promise<Omit<User, 'password'>> {
    const { email, password, ...restParams } = data;

    const { password: userPassword, ...rest } = await this.prismaService.client.user.create({
      data: {
        email,
        password: password ? await bcrypt.hash(password, 10) : '',
        isVerifiedEmail: isDev(this.configService),
        cart: {
          create: {},
        },

        ...restParams,
      },
    });

    return rest;
  }

  async getByEmail(email: string): Promise<{ data: User | null }> {
    const user = await this.prismaService.client.user.findUnique({
      where: {
        email,
      },
    });

    return {
      data: user,
    };
  }

  async getById(id: number): Promise<{ data: User | null }> {
    const user = await this.prismaService.client.user.findUnique({
      where: {
        id,
      },
    });

    return {
      data: user,
    };
  }

  async updateUser(
    id: number,
    data: Partial<Omit<User, 'city' | 'warehouse'> & Pick<UpdateUserDto, 'city' | 'warehouse'>>,
  );
  async updateUser(
    email: string,
    data: Partial<Omit<User, 'city' | 'warehouse'> & Pick<UpdateUserDto, 'city' | 'warehouse'>>,
  );
  async updateUser(
    idOrEmail: string | number,
    data: Partial<Omit<User, 'city' | 'warehouse'> & Pick<UpdateUserDto, 'city' | 'warehouse'>>,
  ): Promise<Omit<User, 'password'>> {
    if (typeof idOrEmail === 'number') {
      const { password, ...rest } = await this.prismaService.client.user.update({
        where: {
          id: idOrEmail,
        },
        data,
      });

      return rest;
    }

    const { password, ...rest } = await this.prismaService.client.user.update({
      where: {
        email: idOrEmail,
      },
      data,
    });

    return rest;
  }

  // TODO: add new tokens when email was updated

  async updateUserData(id: string, dto: UpdateUserDto) {
    const { currentPassword, newPassword, email: newEmail, phoneNumber, ...data } = dto;
    const dataToUpdate = data as Partial<
      Omit<User, 'city' | 'warehouse'> & Pick<UpdateUserDto, 'city' | 'warehouse'>
    >;

    const { data: userData } = await this.getById(+id);

    if (!userData) throw new UnauthorizedException(messagesFromServer.user.notFound.ua);

    if (newEmail) {
      const { data: isUserExist } = await this.getByEmail(newEmail);

      if (isUserExist && isUserExist.id !== +id) {
        throw new ConflictException(messagesFromServer.user.existEmail.ua);
      }

      dataToUpdate.email = newEmail;
    }

    if (phoneNumber) {
      const isPhoneNumberExist = await this.prismaService.client.user.findUnique({
        where: {
          phoneNumber,
        },
      });

      if (isPhoneNumberExist && phoneNumber !== userData.phoneNumber) {
        throw new ConflictException(messagesFromServer.user.existPhoneNumber.ua);
      }

      dataToUpdate.phoneNumber = phoneNumber;
    }

    // if current password and new password provided
    if ((!currentPassword && newPassword) || (currentPassword && !newPassword))
      throw new NotFoundException(messagesFromServer.user.oldOrNewPasswordWasNotProvided.ua);

    if (currentPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, userData.password);

      if (!isPasswordValid)
        throw new NotFoundException(messagesFromServer.user.incorrectPassword.ua);

      const password = await bcrypt.hash(newPassword, 10);

      dataToUpdate.password = password;
    }

    /**
      if all necessary data for shipping was provided 
      - update isPersonalDataRequired to avoid redirect to account update page
    */

    const isPersonalDataCompleted = Boolean(
      (data.firstName || userData.firstName) &&
        (data.lastName || userData.lastName) &&
        // (data.city || user.city) &&
        // (data.warehouse || user.warehouse) &&
        (phoneNumber || userData.phoneNumber),
    );

    dataToUpdate.isPersonalDataFilled = isPersonalDataCompleted;

    const updatedUser = await this.updateUser(+id, dataToUpdate);

    return {
      message: messagesFromServer.user.success.ua,
      data: updatedUser,
    };
  }

  // 1c sync
  async updateUserBalanceAndPriceTier(
    data: Array<Pick<User, 'id' | 'balance' | 'customerPriceTier'>>,
  ) {
    const dataChunks = chunkArray(data, 50);

    try {
      for (const chunkedData of dataChunks) {
        await this.prismaService.client.$transaction(
          chunkedData.map(user =>
            this.prismaService.client.user.update({
              where: { id: user.id },
              data: {
                balance: user.balance,
                customerPriceTier: user.customerPriceTier,
              },
            }),
          ),
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllUsersFromDB(): Promise<UserWithSettlementsAndOrder[]> {
    const users = await this.prismaService.client.user.findMany({
      include: {
        payment: true,
        invoice: {
          select: {
            id: true,
            id1c: true,
            totalAmount: true,
            createdAt: true,
            userId: true,
            item: {
              select: {
                item: {
                  select: {
                    name: true,
                  },
                },
                itemId: true,
                price: true,
                amountPerItem: true,
                itemQty: true,
              },
            },
          },
        },
        order: true,
      },
    });

    const usersToReponse = users.map(user => {
      const { invoice, ...rest } = user;

      const invoiceToResponse = invoice.map(inv => {
        const { item, ...restInvoice } = inv;

        const itemsToReponse = item
          .map(itm => {
            const { item, itemId, ...restItem } = itm;

            return {
              ...restItem,
              id: itemId,
              name: item.name,
            };
          })
          .sort((a, b) => a.id.localeCompare(b.id));

        return {
          ...restInvoice,
          item: itemsToReponse,
        };
      });

      return {
        ...rest,
        invoice: invoiceToResponse,
      };
    });

    return usersToReponse;
  }

  async manageUsersRedisCache(action: 'DELETE' | 'GET' | 'RESET' = 'GET') {
    const actionDelete = async () => {
      await this.redisClient.del(this.redisKey_AllUsers);

      return [] as UserWithSettlementsAndOrder[];
    };

    const actionReset = async () => {
      await actionDelete();

      const itemsFromDb = await this.getAllUsersFromDB();

      await this.redisClient.set(this.redisKey_AllUsers, JSON.stringify(itemsFromDb));

      return itemsFromDb as UserWithSettlementsAndOrder[];
    };

    const actionGet = async () => {
      const allUsersFromRedis = await this.redisClient.get(this.redisKey_AllUsers);

      if (allUsersFromRedis) {
        return JSON.parse(allUsersFromRedis) as UserWithSettlementsAndOrder[];
      }

      const itemsFromDb = await actionReset();

      return itemsFromDb;
    };

    switch (action) {
      case 'DELETE':
        return actionDelete();

      case 'RESET':
        return actionReset();

      default:
        return actionGet();
    }
  }

  async getMappedBy1cUsers() {
    const usersFromDb = await this.manageUsersRedisCache();
    const usersSyncedWith1c = usersFromDb.filter(user => user.id1c !== null);

    const mapped = new Map<string, User>(usersSyncedWith1c.map(user => [user.id1c, user]));

    return mapped;
  }
}

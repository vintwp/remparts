import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { ItemService } from 'src/item/item.service';
import { CustomerPriceTier, Prisma } from '@prisma/client';
import { AddDeleteItemCartDto } from './dto/add-delete-item-cart.dto';
import Redis from 'ioredis';
import { UserService } from 'src/user/user.service';
import { messagesFromServer } from 'src/config/messagesFromServer';
import { TItemReturn } from 'src/types';
import { TItemCart } from './types';

@Injectable()
export class CartService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async getByEmail(userEmail: string): Promise<{ items: TItemCart[]; totalSum: number }> {
    const { customerPriceTier } = await this.userService.getByEmail(userEmail);

    const redisKey = `cart-${userEmail}`;

    const cartFromRedis = await this.redisClient.get(redisKey);

    if (cartFromRedis) return JSON.parse(cartFromRedis);

    const cart = await this.prismaService.client.cart.findFirst({
      where: {
        user: {
          email: userEmail,
        },
      },
      include: {
        item: {
          select: {
            item: {
              include: {
                images: true,
              },
            },
            itemQty: true,
          },
        },
      },
    });

    const { item: cartItemsFromDB } = cart;

    const cartItemsToResponse = [...cartItemsFromDB].map(cartItemFromDb => {
      const { id, name, price, images } = this.itemService.mapItemsWithTierPrice(
        cartItemFromDb.item,
        customerPriceTier,
      );

      return {
        id,
        name,
        price,
        images,
        itemQty: cartItemFromDb.itemQty,
      };
    });

    const totalSum = cartItemsToResponse.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.itemQty;
    }, 0);

    await this.redisClient.setex(redisKey, 12 * 3600, JSON.stringify(cartItemsToResponse));

    return { items: cartItemsToResponse, totalSum };
  }

  async add(userEmail: string, item: AddDeleteItemCartDto) {
    try {
      const redisKey = `cart-${userEmail}`;
      await this.redisClient.del(redisKey);
      await this.prismaService.client.cart.update({
        where: {
          userEmail,
        },
        data: {
          item: {
            upsert: {
              where: {
                cartEmail_itemId: {
                  cartEmail: userEmail,
                  itemId: item.itemId,
                },
              },
              update: {
                itemQty: item.itemQty,
              },
              create: {
                item: {
                  connect: {
                    id: item.itemId,
                  },
                },
                itemQty: item.itemQty,
              },
            },
          },
        },
      });

      return this.getByEmail(userEmail);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new InternalServerErrorException(messagesFromServer.cart.invalidId.ua);
        }
      }

      throw new InternalServerErrorException(messagesFromServer.cart.addError.ua);
    }
  }

  async delete(userEmail: string, item: Pick<AddDeleteItemCartDto, 'itemId'>) {
    try {
      const redisKey = `cart-${userEmail}`;
      await this.redisClient.del(redisKey);
      await this.prismaService.client.cart.update({
        where: {
          userEmail,
        },
        data: {
          item: {
            delete: {
              cartEmail_itemId: {
                cartEmail: userEmail,
                itemId: item.itemId,
              },
            },
          },
        },
      });

      return this.getByEmail(userEmail);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2017') {
          throw new InternalServerErrorException(messagesFromServer.cart.invalidId.ua);
        }
      }

      throw new InternalServerErrorException(messagesFromServer.cart.removeError.ua);
    }
  }
}

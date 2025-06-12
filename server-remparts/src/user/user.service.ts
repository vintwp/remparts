import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { isDev } from 'src/lib/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(
    data: Pick<User, 'email'> & Partial<Omit<User, 'email'>>,
  ): Promise<Omit<User, 'password'>> {
    const { email, password, ...restParams } = data;

    const isExistEmail = await this.prismaService.client.user.findUnique({
      where: {
        email,
      },
    });

    if (isExistEmail) {
      throw new ConflictException('User with this email is exist. Try to use another email');
    }

    const { password: userPassword, ...rest } = await this.prismaService.client.user.create({
      data: {
        email,
        password: password ? await bcrypt.hash(password, 10) : '',
        isVerified: isDev(this.configService),
        cart: {
          create: {},
        },

        ...restParams,
      },
    });

    return rest;
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.prismaService.client.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUser(email: string, data: Partial<User>) {
    return await this.prismaService.client.user.update({
      where: {
        email,
      },
      data,
    });
  }

  async getAllUsers() {
    return await this.prismaService.client.user.findMany();
  }
}

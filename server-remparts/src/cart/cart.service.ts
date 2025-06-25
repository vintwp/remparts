import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { ItemService } from 'src/item/item.service';
import { Prisma } from '@prisma/client';
import { AddItemCartDto } from './dto/add-item-cart.dto';
import Redis from 'ioredis';
import { UserService } from 'src/user/user.service';
import { messagesFromServer } from 'src/config/messagesFromServer';
import { TItemCart } from './types';
import { DeleteItemCartDto } from './dto/delete-item-cart.dto';

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
          orderBy: {
            addedAt: 'asc',
          },
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

      const flattenImages = cartItemFromDb.item.images.map(itmImage => {
        if (typeof itmImage === 'string') {
          return itmImage;
        }

        return itmImage.link;
      });

      return {
        id,
        name,
        price,
        images: flattenImages,
        itemQty: cartItemFromDb.itemQty,
      };
    });

    const totalSum = cartItemsToResponse.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.itemQty;
    }, 0);

    const response = { items: cartItemsToResponse, totalSum };

    await this.redisClient.setex(redisKey, 12 * 3600, JSON.stringify(response));

    return response;
  }

  async add(userEmail: string, item: AddItemCartDto) {
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

      const cart = await this.getByEmail(userEmail);
      return {
        data: cart,
        message: messagesFromServer.cart.addSuccess.ua,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new InternalServerErrorException(messagesFromServer.cart.invalidId.ua);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2017') {
          throw new InternalServerErrorException(messagesFromServer.cart.addError.ua);
        }

        if (error.code === 'P2025') {
          throw new InternalServerErrorException(messagesFromServer.cart.invalidId.ua);
        }
      }

      throw new InternalServerErrorException(messagesFromServer.cart.addError.ua);
    }
  }

  async delete(userEmail: string, item: Pick<DeleteItemCartDto, 'itemId'>) {
    try {
      const redisKey = `cart-${userEmail}`;
      await this.redisClient.del(redisKey);
      await this.prismaService.client.cart.update({
        where: {
          userEmail,
        },
        data: {
          item: {
            deleteMany: item.itemId.map(id => ({
              cartEmail: userEmail,
              itemId: id,
            })),
          },
        },
      });

      const cart = await this.getByEmail(userEmail);

      return {
        data: cart,
        message: messagesFromServer.cart.removeSuccess.ua,
      };
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

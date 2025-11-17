import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';
import { chunkArray, compareArrayOfObjectsByKeys } from 'src/lib/utils';
import { OrderItem } from './types/OrderItem';

@Injectable()
export class OrderService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async getAllOrders(userId?: string) {
    try {
      const result = await this.prismaService.client.order.findMany({
        where: { user: { id: +userId || undefined } },
        include: {
          item: {
            include: {
              item: true,
            },
          },
        },
      });

      return result;
    } catch {
      throw NotFoundException;
    }
  }

  async create(userEmail: string, item: CreateOrderDto[]) {
    try {
      const req = await this.prismaService.client.order.create({
        data: {
          user: {
            connect: {
              email: userEmail,
            },
          },
          item: {
            createMany: {
              data: item.map(itm => ({
                itemId: itm.id,
                itemQty: itm.itemQty,
                itemPrice: itm.amountPerItem,
              })),
            },
          },
          id1c: '',
          comment: '',
        },
      });

      return req;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Unsync order haven't id1c
  async getUnsyncOrders() {
    const orders = await this.prismaService.client.order.findMany({
      where: {
        id1c: '',
        AND: { user: { id1c: { not: '' } } },
      },
      include: {
        item: {
          include: {
            item: true,
          },
        },
        user: true,
      },
    });

    return orders;
  }

  async updateOrders(
    data: Array<
      Pick<
        Order,
        | 'id'
        | 'id1c'
        | 'processed'
        | 'comment'
        | 'invoiceId'
        | 'totalAmount'
        | 'invoiceHash'
        | 'orderHash'
      >
    >,
  ) {
    try {
      const chunkedOrders = chunkArray(data, 10);
      const updatedOrders: Order[] = [];

      for (const chunkedOrder of chunkedOrders) {
        const res = await this.prismaService.client.$transaction(
          chunkedOrder.map(order =>
            this.prismaService.client.order.updateManyAndReturn({
              where: {
                id: order.id,
              },
              data: {
                id1c: order.id1c,
                orderHash: order.orderHash,
                processed: order.processed,
                comment: order.comment,
                totalAmount: order.totalAmount,
                invoiceId: order.invoiceId,
                invoiceHash: order.invoiceHash,
              },
            }),
          ),
        );

        updatedOrders.push(...res.flatMap(itm => itm));
      }

      return updatedOrders;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByUser(userId: string) {
    try {
      const result = await this.prismaService.client.order.findMany({
        where: { user: { id: +userId } },
        include: {
          item: {
            include: {
              item: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const response = result.map(order => {
        const { item, ...rest } = order;

        const orderItems = item.map(itm => ({
          itemId: itm.itemId,
          itemQty: itm.itemQty,
          itemName: itm.item.name,
          itemPrice: itm.itemPrice,
          itemAmount: itm.itemPrice * itm.itemQty,
        }));

        return {
          ...rest,
          items: orderItems,
        };
      });

      return response;
    } catch {
      throw NotFoundException;
    }
  }
  async getOrderById(userId: number, orderId: number) {
    const order = await this.prismaService.client.order.findUnique({
      where: {
        id: orderId,
        user: {
          id: userId,
        },
      },
      include: {
        item: {
          include: {
            item: true,
          },
        },
      },
    });

    const orderItems = order.item.map(itm => {
      return {
        ...itm,
        name: itm.item.name,
        item: undefined,
      };
    });

    return {
      ...order,
      item: orderItems,
    };
  }
}

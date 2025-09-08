import { Inject, Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import Redis from 'ioredis';
import { CustomPrismaService } from 'nestjs-prisma';
import { chunkArray } from 'src/lib/utils';
import { ExtendedPrismaClient } from 'src/prisma.extension';

@Injectable()
export class PaymentService {
  private readonly redisKey_AllPayments: string;
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    this.redisKey_AllPayments = 'payments_all';
  }

  private async getAllPaymentsFromDB(): Promise<Payment[]> {
    return this.prismaService.client.payment.findMany({});
  }

  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return this.prismaService.client.payment.findMany({ where: { userId } });
  }

  async createAndUpdatePayments(payments: Payment[]) {
    try {
      const chunkedPayments = chunkArray(payments, 200);

      for (const chunkedPayment of chunkedPayments) {
        await this.prismaService.client.$transaction(
          chunkedPayment.map(payment =>
            this.prismaService.client.payment.upsert({
              where: {
                id: payment.id,
              },
              update: {
                value: payment.value,
                currency: payment.currency,
                createdAt: payment.createdAt.toISOString(),
                userId: payment.userId,
              },
              create: {
                id: payment.id,
                id1c: payment.id1c,
                value: payment.value,
                currency: payment.currency,
                createdAt: payment.createdAt.toISOString(),
                userId: payment.userId,
              },
            }),
          ),
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async managePaymentsRedisCache(action: 'DELETE' | 'GET' | 'RESET' = 'GET'): Promise<Payment[]> {
    const actionDelete = async () => {
      await this.redisClient.del(this.redisKey_AllPayments);

      return [] as Payment[];
    };

    const actionReset = async () => {
      await actionDelete();

      const paymentsFromDb = await this.getAllPaymentsFromDB();

      await this.redisClient.set(this.redisKey_AllPayments, JSON.stringify(paymentsFromDb));

      return paymentsFromDb;
    };

    const actionGet = async () => {
      const allPaymentsFromRedis = await this.redisClient.get(this.redisKey_AllPayments);

      if (allPaymentsFromRedis) {
        return JSON.parse(allPaymentsFromRedis) as Payment[];
      }

      const paymentsFromDb = await actionReset();

      return paymentsFromDb;
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
}

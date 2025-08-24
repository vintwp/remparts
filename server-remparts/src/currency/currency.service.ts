import { Inject, Injectable } from '@nestjs/common';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import Redis from 'ioredis';
import { messagesFromServer } from 'src/config/messagesFromServer';

@Injectable()
export class CurrencyService {
  private readonly redisCacheKey: string;
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrismaService<ExtendedPrismaClient>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    this.redisCacheKey = 'currency';
  }
  async get() {
    const currencyFromRedis = await this.redisClient.get(this.redisCacheKey);

    if (currencyFromRedis) return JSON.parse(currencyFromRedis) as number;

    const currencyFromDb = await this.prisma.client.exchangeRate.findFirst({
      where: {
        id: 1,
      },
    });

    await this.redisClient.set(this.redisCacheKey, JSON.stringify(currencyFromDb.value));

    return currencyFromDb.value;
  }

  async update(updateCurrencyDto: UpdateCurrencyDto) {
    await this.redisClient.del(this.redisCacheKey);

    return await this.prisma.client.exchangeRate.update({
      where: {
        id: 1,
      },
      data: {
        value: updateCurrencyDto.value,
      },
    });
  }
}

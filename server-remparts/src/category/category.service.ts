import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'nestjs-prisma';
import { Category } from '@prisma/client';
import { ItemService } from 'src/item/item.service';
import { TResponseCategoryByUrl } from './types';
import Redis from 'ioredis';

const SECONDS_PER_HOUR = 3600;

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly itemService: ItemService,

    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      include: {
        department: true,
      },
    });

    return categories;
  }

  async getByUrl(
    url: string,
    brandId?: number[],
    qualityId?: number[],
    complianceId?: number[],
    page?: number,
    perPage?: number,
    sortBy?: string,
    stock?: boolean,
  ): Promise<any> {
    const cacheKeyRedis = url;

    let category: TResponseCategoryByUrl['category'];

    const categoryFromRedis = await this.redisClient.get(cacheKeyRedis);

    // create cached category in Redis
    if (!categoryFromRedis) {
      category = await this.prismaService.category.findUnique({
        where: {
          url: url,
        },
        include: {
          department: true,
          brand: true,
          quality: true,
          complianceWith: true,
        },
      });

      await this.redisClient.setex(
        cacheKeyRedis,
        SECONDS_PER_HOUR * 48,
        JSON.stringify(category),
      );
    }

    // assign cached category
    if (categoryFromRedis) {
      category = JSON.parse(
        categoryFromRedis,
      ) as TResponseCategoryByUrl['category'];
    }

    const itemsByCategory = await this.itemService.getByParams(
      category.id,
      brandId,
      qualityId,
      complianceId,
      page,
      perPage,
      sortBy,
      stock,
    );

    return { category, itemsByCategory };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

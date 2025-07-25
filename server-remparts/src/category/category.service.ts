import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'nestjs-prisma';
import { Category, CustomerPriceTier } from '@prisma/client';
import { ItemService } from 'src/item/item.service';
import { TResponseCategoryByUrl } from './types';
import Redis from 'ioredis';
import { priceTierToProductParam } from 'src/types';

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

  async getAll(): Promise<{ data: Category[] }> {
    const redisKey = `category-all`;

    const categoriesFromRedis = await this.redisClient.get(redisKey);

    if (categoriesFromRedis) return { data: JSON.parse(categoriesFromRedis) };

    const categories = await this.prismaService.category.findMany({
      include: {
        department: true,
      },
    });

    await this.redisClient.setex(redisKey, 12 * 3600, JSON.stringify(categories));

    return { data: categories };
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
    customerPriceTier: CustomerPriceTier = 'RETAIL',
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

      await this.redisClient.setex(cacheKeyRedis, SECONDS_PER_HOUR * 48, JSON.stringify(category));
    }

    // assign cached category
    if (categoryFromRedis) {
      category = JSON.parse(categoryFromRedis) as TResponseCategoryByUrl['category'];
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

    const mappedItemsWithTierPrice = this.itemService.mapItemsWithTierPrice(
      itemsByCategory.items,
      customerPriceTier,
    );

    return {
      data: {
        category,
        itemsByCategory: {
          items: mappedItemsWithTierPrice,
          pagination: itemsByCategory.pagination,
        },
      },
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

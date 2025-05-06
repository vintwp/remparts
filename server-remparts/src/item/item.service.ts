import Redis from 'ioredis';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma.extension';
import { Item } from '@prisma/client';
import { Sort } from './types';
import { paginate } from 'src/lib';

@Injectable()
export class ItemService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrismaService<ExtendedPrismaClient>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  async getAll(): Promise<Item[]> {
    const cacheKeyRedis = 'items_all';

    const allItemsFromRedis = await this.redisClient.get(cacheKeyRedis);

    if (allItemsFromRedis) {
      return JSON.parse(allItemsFromRedis) as Item[];
    }

    const items = await this.prisma.client.item.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            link: true,
          },
        },
      },
    });

    await this.redisClient.setex(cacheKeyRedis, 21600, JSON.stringify(items));

    return items;
  }

  private filterItems(
    items: Item[],
    {
      categoryId,
      brandId,
      qualityId,
      complianceId,
      stock,
    }: {
      categoryId?: number[];
      brandId?: number[];
      qualityId?: number[];
      complianceId?: number[];
      stock?: boolean;
    },
  ) {
    const filteredItems = [...items].filter((item) => {
      let shouldBeAdded = true;

      // check for brand condition

      if (categoryId.length > 0 && !categoryId.includes(item.categoryId)) {
        shouldBeAdded = false;
      }

      if (brandId.length > 0 && !brandId.includes(item.brandId)) {
        shouldBeAdded = false;
      }

      if (qualityId.length > 0 && !qualityId.includes(item.qualityId)) {
        shouldBeAdded = false;
      }

      if (complianceId.length > 0 && !qualityId.includes(item.complianceId)) {
        shouldBeAdded = false;
      }

      if (stock && item.stock < 1) {
        shouldBeAdded = false;
      }

      return shouldBeAdded;
    });

    return filteredItems;
  }

  private sortItems(items: Item[], sortBy?: string) {
    const sortKey: keyof Sort = sortBy ? (sortBy as keyof Sort) : 'name-asc';

    const sortedItems = [...items].sort((itm1, itm2) => {
      switch (sortKey) {
        case 'name-desc':
          return itm2.name.localeCompare(itm1.name);
        case 'price-asc':
          return itm1.price - itm2.price;
        case 'price-desc':
          return itm2.price - itm1.price;
        default:
          return itm1.name.localeCompare(itm2.name);
      }
    });

    return sortedItems;
  }

  private paginateItems(
    items: Item[],
    { page, perPage }: { page?: number; perPage?: number },
  ) {
    const LIMIT_MAX_PRODUCT_BY_REQUEST = 300;
    const LIMIT_DEFAULT_PRODUCT_BY_REQUEST = 20;

    const perPageRequest =
      perPage === 0
        ? LIMIT_MAX_PRODUCT_BY_REQUEST
        : perPage
          ? perPage
          : LIMIT_DEFAULT_PRODUCT_BY_REQUEST;

    const { data: paginatedItems, pagination } = paginate({
      data: items,
      page: page || 1,
      perPage: perPageRequest,
      url: '',
    });

    return {
      items: paginatedItems,
      pagination: pagination,
    };
  }

  createResponseItems(
    items: Item[],
    {
      filterOptions: {
        categoryId = [],
        brandId = [],
        qualityId = [],
        complianceId = [],
        stock,
      },
      page,
      perPage,
      sortKey,
    }: {
      filterOptions: {
        categoryId?: number[];
        brandId?: number[];
        qualityId?: number[];
        complianceId?: number[];
        stock?: boolean;
      };
      page?: number;
      perPage?: number;
      sortKey?: string;
    },
  ) {
    const filteredItemsByParams = this.filterItems(items, {
      categoryId,
      brandId,
      qualityId,
      complianceId,
      stock,
    });

    const sortedItemsBySort = this.sortItems(filteredItemsByParams, sortKey);

    // paginate array of products (sorted, filtered)

    const { items: itemsPaginated, pagination } = this.paginateItems(
      sortedItemsBySort,
      {
        page,
        perPage,
      },
    );

    return {
      items: itemsPaginated,
      pagination: pagination,
    };
  }

  async getByParams(
    categoryId: number,
    brandId?: number[],
    qualityId?: number[],
    complianceId?: number[],
    page?: number,
    perPage?: number,
    sortBy?: string,
    stock?: boolean,
  ) {
    const cacheKeyRedis = `category-${categoryId}`;

    let itemsByCategory: Item[];

    const itemsPerRequestFromRedis = await this.redisClient.get(cacheKeyRedis);

    // assign cached Items

    if (itemsPerRequestFromRedis) {
      itemsByCategory = JSON.parse(itemsPerRequestFromRedis);
    }

    if (!itemsPerRequestFromRedis) {
      itemsByCategory = await this.prisma.client.item.findMany({
        where: {
          categoryId,
        },
        include: {
          images: {
            select: {
              link: true,
            },
          },
        },
      });

      await this.redisClient.setex(
        cacheKeyRedis,
        14400,
        JSON.stringify(itemsByCategory),
      );
    }

    // #region old filtering and sorting TO DELETE

    // filterItems by query params

    // const filteredItems = [...itemsByCategory].filter((item) => {
    //   let shouldBeAdded = true;

    //   // check for brand condition

    //   if (brandId.length > 0 && !brandId.includes(item.brandId)) {
    //     shouldBeAdded = false;
    //   }

    //   if (qualityId.length > 0 && !qualityId.includes(item.qualityId)) {
    //     shouldBeAdded = false;
    //   }

    //   if (complianceId.length > 0 && !qualityId.includes(item.complianceId)) {
    //     shouldBeAdded = false;
    //   }

    //   if (stock && item.stock < 1) {
    //     shouldBeAdded = false;
    //   }

    //   return shouldBeAdded;
    // });

    // sort items by sort Field

    // const sortedItems = [...filteredItems].sort((itm1, itm2) => {
    //   switch (sortKey) {
    //     case 'name-desc':
    //       return itm2.name.localeCompare(itm1.name);
    //     case 'price-asc':
    //       return itm1.price - itm2.price;
    //     case 'price-desc':
    //       return itm2.price - itm1.price;
    //     default:
    //       return itm1.name.localeCompare(itm2.name);
    //   }
    // });

    // const filteredItemsByParams = this.filterItems(itemsByCategory, {
    //   brandId,
    //   qualityId,
    //   complianceId,
    //   stock,
    // });
    // const sortedItemsBySort = this.sortItems(filteredItemsByParams, sortKey);

    // paginate array of products (sorted, filtered)

    // const { items, pagination } = this.paginateItems(sortedItemsBySort, {
    //   page,
    //   perPage,
    // });

    // #endregion

    const reponseItems = this.createResponseItems(itemsByCategory, {
      filterOptions: {
        brandId,
        qualityId,
        complianceId,
        stock,
      },
      page,
      perPage,
      sortKey: sortBy,
    });

    return {
      items: reponseItems.items,
      pagination: reponseItems.pagination,
    };
  }

  async getById(id: number) {
    return `This action returns a #${id} item`;
  }

  async updateById(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async deleteById(id: number) {
    return `This action removes a #${id} item`;
  }
}

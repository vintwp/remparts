import Redis from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma.extension';
import { CustomerPriceTier, Item } from '@prisma/client';
import { Sort } from './types';
import { ItemWithImageLinks, ItemWithImageObjects } from 'src/shared/types/';
import { chunkArray, compareObjectsByKeys, paginate } from 'src/lib/utils';
import { priceTierToProductParam, TItemReturn } from 'src/shared/types/';

@Injectable()
export class ItemService {
  private readonly redisKey_AllItems: string;
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    this.redisKey_AllItems = 'items_all';
  }

  // #region helper functions
  private refineFieldsMatch(fieldId: string | number): number {
    return +fieldId > 0 ? +fieldId : 1;
  }

  private async getAllItemsFromDB() {
    const items = await this.prismaService.client.item.findMany({
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

    const itemsWithImageLinks = this.flattenProductImageLinks(items);

    return itemsWithImageLinks;
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
    const filteredItems = [...items].filter(item => {
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

  private paginateItems(items: Item[], { page, perPage }: { page?: number; perPage?: number }) {
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

  public flattenProductImageLinks<T extends ItemWithImageObjects>(
    items: T[],
  ): Array<ItemWithImageLinks> {
    const result = items.map(itm => {
      const images = itm.images.map(img => {
        if (typeof img === 'string') {
          return img;
        }

        return img.link;
      });

      return {
        ...itm,
        images,
      };
    });

    return result;
  }

  public createResponseItems(
    items: ItemWithImageObjects[],
    {
      filterOptions: { categoryId = [], brandId = [], qualityId = [], complianceId = [], stock },
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
    const itemsWithImageLinks = this.flattenProductImageLinks(items);

    const filteredItemsByParams = this.filterItems(itemsWithImageLinks, {
      categoryId,
      brandId,
      qualityId,
      complianceId,
      stock,
    });

    const sortedItemsBySort = this.sortItems(filteredItemsByParams, sortKey);

    // paginate array of products (sorted, filtered)

    const { items: itemsPaginated, pagination } = this.paginateItems(sortedItemsBySort, {
      page,
      perPage,
    });

    return {
      items: itemsPaginated,
      pagination: pagination,
    };
  }

  public mapItemsWithTierPrice(items: Item, customerPriceTier: CustomerPriceTier): TItemReturn;
  public mapItemsWithTierPrice(items: Item[], customerPriceTier: CustomerPriceTier): TItemReturn[];
  public mapItemsWithTierPrice(
    items: Item | Item[],
    customerPriceTier: CustomerPriceTier = 'RETAIL',
  ): TItemReturn | TItemReturn[] {
    const priceFieldInItem = priceTierToProductParam[customerPriceTier];

    if (!Array.isArray(items)) {
      const priceToReturn = items[priceFieldInItem];
      const { price, priceWholesaleBasic, priceWholesaleStandard, priceWholesaleTop, ...rest } =
        items;

      return {
        ...rest,
        price: priceToReturn,
      };
    }

    const mappedItems = items.map(item => {
      const priceToReturn = item[priceFieldInItem];
      const { price, priceWholesaleBasic, priceWholesaleStandard, priceWholesaleTop, ...rest } =
        item;

      return {
        ...rest,
        price: priceToReturn,
      };
    });

    return mappedItems;
  }

  async manageItemsRedisCache(action: 'DELETE' | 'GET' | 'RESET' = 'GET') {
    const actionDelete = async () => {
      await this.redisClient.del(this.redisKey_AllItems);

      return [] as ItemWithImageLinks[];
    };

    const actionReset = async () => {
      await actionDelete();

      const itemsFromDb = await this.getAllItemsFromDB();

      await this.redisClient.setex(this.redisKey_AllItems, 21600, JSON.stringify(itemsFromDb));

      return itemsFromDb;
    };

    const actionGet = async () => {
      const allItemsFromRedis = await this.redisClient.get(this.redisKey_AllItems);

      if (allItemsFromRedis) {
        return JSON.parse(allItemsFromRedis) as ItemWithImageLinks[];
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

  // #endregion

  private async createMany(itemsFrom1c: Array<Omit<Item, 'id'>>) {
    const createdItems: Item[] = [];
    const itemsToCreateChunks = chunkArray(itemsFrom1c, 500);

    // transaction loop to create items

    try {
      for (const chunkedItems of itemsToCreateChunks) {
        await this.prismaService.client.$transaction(async prisma => {
          const createdItemsReponse = await prisma.item.createManyAndReturn({
            data: chunkedItems.map(item => {
              const departmentId = this.refineFieldsMatch(item.departmentId);
              const categoryId = this.refineFieldsMatch(item.categoryId);
              const brandId = this.refineFieldsMatch(item.brandId);
              const complianceId = this.refineFieldsMatch(item.complianceId);
              const qualityId = this.refineFieldsMatch(item.qualityId);

              return {
                id1c: item.id1c,
                isHidden: item.isHidden || false,
                idAfm: !!item.idAfm ? item.idAfm : undefined,
                name: item.name,
                priceWholesaleTop: item.priceWholesaleTop,
                priceWholesaleStandard: item.priceWholesaleStandard,
                priceWholesaleBasic: item.priceWholesaleBasic,
                price: item.price,
                stock: item.stock,
                departmentId: departmentId,
                categoryId: categoryId,
                brandId: brandId,
                complianceId: complianceId,
                qualityId: qualityId,
              };
            }),
          });
          const createdItemsIds = createdItemsReponse.map(itm => itm.id);

          // Add no-image to all created items
          await prisma.itemImage.createMany({
            data: createdItemsIds.map(id => ({
              itemId: id,
              link: 'no-image.png',
            })),
          });

          createdItems.push(...createdItemsReponse);
        });
      }

      return createdItems;
    } catch (error) {
      throw error;
    }
  }

  private async updateMany(itemsFrom1c: Array<Omit<Item, 'id'>>) {
    const updatedItems: Item[] = [];

    if (!itemsFrom1c.length) {
      return updatedItems; // nothing to update
    }

    const itemsToUpdateChunks = chunkArray(itemsFrom1c, 500);

    // transaction loop to update items

    try {
      for (const chunkedItems of itemsToUpdateChunks) {
        await this.prismaService.client.$transaction(async prisma => {
          const updItems = await Promise.all(
            chunkedItems.map(item => {
              const departmentId = this.refineFieldsMatch(item.departmentId);
              const categoryId = this.refineFieldsMatch(item.categoryId);
              const brandId = this.refineFieldsMatch(item.brandId);
              const complianceId = this.refineFieldsMatch(item.complianceId);
              const qualityId = this.refineFieldsMatch(item.qualityId);

              return prisma.item.update({
                where: { id1c: item.id1c },
                data: {
                  idAfm: !!item.idAfm ? item.idAfm : undefined,
                  name: item.name,
                  priceWholesaleTop: item.priceWholesaleTop,
                  priceWholesaleStandard: item.priceWholesaleStandard,
                  priceWholesaleBasic: item.priceWholesaleBasic,
                  price: item.price,
                  stock: item.stock,
                  departmentId: departmentId,
                  categoryId: categoryId,
                  brandId: brandId,
                  complianceId: complianceId,
                  qualityId: qualityId,
                  isHidden: item.isHidden || false,
                },
              });
            }),
          );

          updatedItems.push(...updItems);
        });
      }

      return updatedItems;
    } catch (error) {
      throw error;
    }
  }

  private async hideMany(itemsFrom1cIds: string[]) {
    const hiddenItems: Item[] = [];

    if (!itemsFrom1cIds.length) {
      return hiddenItems; // nothing to hide
    }

    const itemsToHideChunks = chunkArray(itemsFrom1cIds, 500);

    try {
      for (const chunkedItems of itemsToHideChunks) {
        await this.prismaService.client.$transaction(async prisma => {
          const hidItems = await Promise.all(
            chunkedItems.map(id1c => {
              return prisma.item.update({
                where: { id1c: id1c },
                data: {
                  isHidden: true,
                  categoryId: 1,
                  departmentId: 1,
                  brandId: 1,
                  qualityId: 1,
                },
              });
            }),
          );

          hiddenItems.push(...hidItems);
        });
      }
      return hiddenItems;
    } catch (error) {
      throw error;
    }
  }

  async createAndUpdateMany(itemsFrom1c: Array<Omit<Item, 'id'>>) {
    // We use condition
    // for check departmentId, categoryId, brandId, complianceId, qualityId - to avoid error creating items
    // 1C empty field returns 0, but id starts from 1. So, if we got 0, to avoid error - we set 1

    try {
      // Define items to create
      const itemsFromPostgreSQL = await this.manageItemsRedisCache('GET');
      const itemIdFromPostgreSQL = itemsFromPostgreSQL.map(item => item.id1c);
      const itemId1c = itemsFrom1c.map(item => item.id1c);

      const itemsToCreate = itemsFrom1c.filter(item => !itemIdFromPostgreSQL.includes(item.id1c));
      const itemsToUpdate = itemsFrom1c
        .filter(item => itemIdFromPostgreSQL.includes(item.id1c))
        .filter(item => {
          const existItemInPostgreSQL = itemsFromPostgreSQL.find(itm => itm.id1c === item.id1c);
          const isEqual = compareObjectsByKeys(item, existItemInPostgreSQL, [
            'brandId',
            'categoryId',
            'complianceId',
            'qualityId',
            'departmentId',
            'idAfm',
            'name',
            'price',
            'priceWholesaleBasic',
            'priceWholesaleStandard',
            'priceWholesaleTop',
            'stock',
            'isHidden',
          ]);

          return !isEqual;
        });

      const itemsToHide = itemsFromPostgreSQL
        .filter(itm => !itemId1c.includes(itm.id1c) && !itm.isHidden)
        .map(item => item.id1c);

      const createdItems = await this.createMany(itemsToCreate);
      const updatedItems = await this.updateMany(itemsToUpdate);
      const hiddenItems = await this.hideMany(itemsToHide);

      await this.manageItemsRedisCache('RESET');

      return { createdItems, updatedItems, hiddenItems };
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<ItemWithImageLinks>> {
    return await this.manageItemsRedisCache('GET');
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

    let itemsByCategory: ItemWithImageObjects[];

    const itemsPerRequestFromRedis = await this.redisClient.get(cacheKeyRedis);

    // assign cached Items

    if (itemsPerRequestFromRedis) {
      itemsByCategory = JSON.parse(itemsPerRequestFromRedis);
    }

    if (!itemsPerRequestFromRedis) {
      itemsByCategory = await this.prismaService.client.item.findMany({
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

      await this.redisClient.setex(cacheKeyRedis, 14400, JSON.stringify(itemsByCategory));
    }

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

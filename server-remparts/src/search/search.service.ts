import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Category } from '@prisma/client';
import Redis from 'ioredis';
import { ItemService } from 'src/item/item.service';
import { MeiliService } from 'src/meili/meili.service';

@Injectable()
export class SearchService implements OnApplicationBootstrap {
  constructor(
    private readonly meiliService: MeiliService,
    private readonly itemService: ItemService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async search(
    query: string,
    category?: number,
    page?: number,
    perPage?: number,
    stock?: boolean,
    sortKey?: string,
  ) {
    const findedItems = await this.meiliService.globalSearch(query);

    // unique categories for search page
    const categories = findedItems
      .reduce(
        (total, itm) => {
          const { id } = itm.category;
          const isCategoryExists =
            total.findIndex((cat) => cat.id === id) !== -1;

          if (isCategoryExists) {
            return total;
          }

          total.push(itm.category);

          return total;
        },
        [] as Array<Pick<Category, 'id' | 'name'>>,
      )
      .sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));

    const { items, pagination } = this.itemService.createResponseItems(
      findedItems,
      {
        filterOptions: {
          categoryId: category ? [category] : undefined,
          stock,
        },
        page,
        perPage,
        sortKey,
      },
    );

    return {
      items,
      pagination,
      categories,
    };
  }

  async intitialize() {
    const items = await this.itemService.getAll();
    const itemNamesWithNumberCombinations = items
      .map((itm) => itm.name)
      .filter((itmName) => /\d/.test(itmName));

    const uniqueNumbers = Array.from(
      new Set(
        itemNamesWithNumberCombinations
          .map((name) => {
            const nameString = name
              .split(' ')
              .map((word) => word.replaceAll(/[()\\\/]/g, ''))
              .filter((word) => /\d/.test(word));

            return nameString;
          })
          .flat(),
      ),
    );

    await this.meiliService.addToGlobalSearch(items);
    await this.meiliService.updateSettings({
      rankingRules: [
        'exactness',
        'words',
        'proximity',
        'attribute',
        'typo',
        'sort',
      ],
      typoTolerance: {
        disableOnWords: uniqueNumbers,
      },
    });
  }

  async onApplicationBootstrap() {
    await this.intitialize();
  }
}

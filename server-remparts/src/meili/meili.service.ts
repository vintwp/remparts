import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Category, Item } from '@prisma/client';
import Redis from 'ioredis';
import { Index, MeiliSearch, SearchResponse, Settings } from 'meilisearch';

@Injectable()
export class MeiliService implements OnApplicationBootstrap {
  private index: Index;
  private MEILI_GLOBAL_INDEX: string;
  @Inject('REDIS_CLIENT') private readonly redisClient: Redis;

  constructor(
    @Inject('MEILISEARCH_CLIENT') private readonly meiliClient: MeiliSearch,
  ) {
    this.MEILI_GLOBAL_INDEX = 'global_search';
  }

  async createOrGetIndex(idx: string) {
    try {
      this.index = await this.meiliClient.getIndex(idx);
    } catch (error) {
      if (error.code === 'index_not_found') {
        await this.meiliClient.createIndex(idx, {
          primaryKey: 'id',
        });
        this.index = await this.meiliClient.getIndex(idx);
      } else {
        throw error;
      }
    }
  }

  async addToGlobalSearch<T extends { id: number }>(
    items: T[],
    uniqueKey?: string,
  ) {
    const data = [...items].map((item) => {
      return {
        ...item,
        id: `${uniqueKey ? `${uniqueKey}-` : ''}${item.id}`,
      };
    });

    return await this.index.addDocuments(data);
  }

  async updateSettings(settings: Settings) {
    return await this.index.updateSettings({ ...settings });
  }

  async getDocs() {
    return await this.index.getDocuments();
  }

  async globalSearch(query: string) {
    type TItem = Item & { category: Pick<Category, 'id' | 'name'> };

    const cacheKeyRedis = query;
    const searchResultFromRedis = await this.redisClient.get(cacheKeyRedis);
    let searchedItems: TItem[] = [];

    if (searchResultFromRedis) {
      searchedItems = JSON.parse(searchResultFromRedis);
    }

    if (!searchResultFromRedis) {
      const { hits } = (await this.index.search(query, {
        matchingStrategy: 'all',
        limit: 999,
      })) as SearchResponse<TItem>;

      searchedItems = [...hits];

      await this.redisClient.setex(cacheKeyRedis, 3600, JSON.stringify(hits));
    }

    return searchedItems;
  }

  async onApplicationBootstrap() {
    await this.createOrGetIndex(this.MEILI_GLOBAL_INDEX);
    await this.index.updateSearchableAttributes(['id', 'name']);
    await this.index.updateFilterableAttributes(['id', 'categoryId']);
    await this.index.deleteAllDocuments();
  }
}

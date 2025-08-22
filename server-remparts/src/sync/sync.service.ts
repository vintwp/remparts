import { Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { SyncCatalogDto } from './dto/sync-catalog.dto';

@Injectable()
export class SyncService {
  constructor(private readonly itemService: ItemService) {}

  private async getNewItemsFrom1c(itemsToCreate: SyncCatalogDto[]) {
    const existItems = await this.itemService.getAll();
    const existItemsId = existItems.map(itm => itm.id1c);

    // items not listed in DB (compared with field id1c)
    const newItemsFrom1c = itemsToCreate.filter(itm => !existItemsId.includes(itm.id));

    if (newItemsFrom1c.length === 0) {
      return;
    }

    const newItemsToCreate = newItemsFrom1c.map(itm => {
      const { id, afmId, ...rest } = itm;

      return {
        ...rest,
        id1c: id,
        idAfm: afmId !== '0' ? afmId : undefined,
      };
    });

    await this.itemService.createMany(newItemsToCreate);
  }

  private async updateItemsFrom1c(itemsFrom1c: SyncCatalogDto[]) {}

  async syncCatalog(itemsFrom1c: SyncCatalogDto[]) {
    const itemsFromDb = await this.itemService.getAll();
    const itemIdFromDb = itemsFromDb.map(item => item.id1c);

    const itemsToCreate = itemsFrom1c.filter(item1c => !itemIdFromDb.includes(item1c.id));
    const itemsToUpdate = itemsFrom1c.filter(item1c => itemIdFromDb.includes(item1c.id));

    console.log('itemsToCreate ', itemsToCreate);
    console.log('itemsToUpdate ', itemsToUpdate);
  }
}

import { Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { SyncCatalogDto } from './dto/sync-catalog.dto';
import { messagesFromServer } from 'src/config/messagesFromServer';

@Injectable()
export class SyncService {
  constructor(private readonly itemService: ItemService) {}

  async syncCatalog(itemsFrom1c: SyncCatalogDto[]) {
    const items1c = itemsFrom1c.map(itm => {
      const { id, afmId, ...rest } = itm;
      return {
        ...rest,
        id1c: id,
        idAfm: afmId !== '0' ? afmId : null,
        isHidden: false,
      };
    });
    return this.itemService.createAndUpdateMany(items1c);
  }
}

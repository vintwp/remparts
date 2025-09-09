import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncCurrencyDto } from './dto/sync-currency.dto';
import { SyncCatalogDto } from './dto/sync-catalog.dto';
import { CurrencyService } from 'src/currency/currency.service';
import { messagesFromServer } from 'src/config/messagesFromServer';
import { UserSettlementsDto } from './dto/user-settlements.dto';

@Controller('sync')
export class SyncController {
  constructor(
    private readonly syncService: SyncService,
    private readonly currencyService: CurrencyService,
  ) {}

  @Post('catalog')
  @HttpCode(HttpStatus.OK)
  async syncCatalog(@Body(new ParseArrayPipe({ items: SyncCatalogDto })) dto: SyncCatalogDto[]) {
    try {
      const res = await this.syncService.syncCatalog(dto);

      return {
        data: null,
        message:
          `${messagesFromServer.sync.updateItemsSuccess.ru}. ` +
          `Создано - ${res.createdItems.length}, ` +
          `Обновлено - ${res.updatedItems.length}, ` +
          `Удалено - ${res.hiddenItems.length}`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `${messagesFromServer.sync.updateItemsError.ru}, ${error.message}`,
      );
    }
  }

  @Post('currency')
  @HttpCode(HttpStatus.OK)
  async syncCurrency(@Body() dto: SyncCurrencyDto) {
    try {
      const res = await this.currencyService.update(dto);

      return {
        data: null,
        message: `${messagesFromServer.sync.updateCurrencySuccess.ru} - ${res.value}`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `${messagesFromServer.sync.updateCurrencyError.ru}, ${error.message}`,
      );
    }
  }

  @Post('settlements')
  @HttpCode(HttpStatus.OK)
  async syncSettlements(
    @Body(new ParseArrayPipe({ items: UserSettlementsDto })) dto: UserSettlementsDto[],
  ) {
    try {
      return this.syncService.syncSettlements(dto);
    } catch (error) {
      throw new InternalServerErrorException(
        `${messagesFromServer.sync.updateSettlementsError.ru}, ${error.message}`,
      );
    }
  }
}

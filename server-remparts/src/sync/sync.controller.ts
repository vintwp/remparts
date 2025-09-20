import {
  Body,
  Controller,
  Get,
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
import { PostProcessedOrdersDto } from './dto/post-processed.dto';

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

  @Get('orders')
  @HttpCode(HttpStatus.OK)
  async getNewOrders() {
    const res = await this.syncService.syncOrders();

    return {
      data: res.orderCsv,
      message: `${messagesFromServer.sync.updateOrdersSuccess.ru}. Новых заказов - ${res.order.length}`,
    };
  }

  @Post('orders')
  @HttpCode(HttpStatus.OK)
  async postProcessedOrders(
    @Body(new ParseArrayPipe({ items: PostProcessedOrdersDto })) dto: PostProcessedOrdersDto[],
  ) {
    try {
      const res = await this.syncService.updateOrders(dto);

      console.log(dto);

      return {
        data: null,
        message: `${messagesFromServer.sync.updateOrdersOnServerSuccess.ru}. Обновлено - ${res.length}`,
      };
    } catch (error) {
      return {
        data: null,
        message: `${messagesFromServer.sync.updateOrdersOnServerSuccess.ru}`,
      };
    }
  }
}

import { Body, Controller, HttpCode, HttpStatus, ParseArrayPipe, Post } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncCurrencyDto } from './dto/sync-currency.dto';
import { SyncCatalogDto } from './dto/sync-catalog.dto';
import { CurrencyService } from 'src/currency/currency.service';

@Controller('sync')
export class SyncController {
  constructor(
    private readonly syncService: SyncService,
    private readonly currencyService: CurrencyService,
  ) {}

  @Post('catalog')
  @HttpCode(HttpStatus.OK)
  syncCatalog(@Body(new ParseArrayPipe({ items: SyncCatalogDto })) dto: SyncCatalogDto[]) {
    return this.syncService.syncCatalog(dto);
  }

  @Post('currency')
  @HttpCode(HttpStatus.OK)
  syncCurrency(@Body() dto: SyncCurrencyDto) {
    return this.currencyService.update(dto);
  }
}

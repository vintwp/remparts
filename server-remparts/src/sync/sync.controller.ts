import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncCurrencyDto } from './dto/sync-currency';
import { CurrencyService } from 'src/currency/currency.service';

@Controller('sync')
export class SyncController {
  constructor(
    private readonly syncService: SyncService,
    private readonly currencyService: CurrencyService,
  ) {}

  @Post()
  syncCatalog(@Body() dto: any) {
    console.log(dto);
    return '';
  }

  @Post('currency')
  @HttpCode(HttpStatus.OK)
  syncCurrency(@Body() dto: SyncCurrencyDto) {
    return this.currencyService.update(dto);
  }
}

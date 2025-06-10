import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { CurrencyService } from './currency.service';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { IsAuthorized } from 'src/auth/decorators/is-authorized.decorator';

@Controller('exchange-rate')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  get() {
    return this.currencyService.get();
  }

  @IsAuthorized('ADMIN')
  @Post()
  update(@Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.update(updateCurrencyDto);
  }
}

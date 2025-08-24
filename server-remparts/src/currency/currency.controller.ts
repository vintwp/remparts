import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { CurrencyService } from './currency.service';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { IsAuthorized } from 'src/auth/decorators/is-authorized.decorator';
import { messagesFromServer } from 'src/config/messagesFromServer';

@Controller('exchange-rate')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async get() {
    const res = await this.currencyService.get();

    return {
      data: res,
    };
  }
}

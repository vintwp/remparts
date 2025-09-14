import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  ParseArrayPipe,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { IsAuthorized } from 'src/auth/decorators/is-authorized.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { TJwtUser } from 'src/shared/types';
import { Request } from 'express';
import { messagesFromServer } from 'src/config/messagesFromServer';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @IsAuthorized()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrder() {}

  @IsAuthorized()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllOrders() {}

  @IsAuthorized()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: Request,
    @Body(new ParseArrayPipe({ items: CreateOrderDto })) dto: CreateOrderDto[],
  ) {
    const user = req.user as TJwtUser;
    try {
      const req = await this.orderService.create(user.email, dto);
    } catch {
      throw new InternalServerErrorException(messagesFromServer.order.createOrderError.ua);
    }

    console.log('user create order', user);
    console.log('order for user', dto);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
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
import { ValidateUserAccessById } from 'src/auth/decorators/validate-user-access-by-id.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ValidateUserAccessById()
  @IsAuthorized()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrdersForUser(@Param('id') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @ValidateUserAccessById()
  @IsAuthorized()
  @Get(':id/:orderId')
  @HttpCode(HttpStatus.OK)
  async getOrderByIdForUser(@Param('id') userId: string, @Param('orderId') orderId: string) {
    return this.orderService.getOrderById(+userId, +orderId);
  }

  @IsAuthorized('ADMIN')
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
  }
}

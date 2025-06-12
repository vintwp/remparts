import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { IsAuthorized } from 'src/auth/decorators/is-authorized.decorator';
import { Request } from 'express';
import { TJwtUser } from 'src/types';
import { AddDeleteItemCartDto } from './dto/add-delete-item-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @IsAuthorized()
  @Get()
  @HttpCode(HttpStatus.OK)
  get(@Req() req: Request) {
    const user = req.user as TJwtUser;
    return this.cartService.getByEmail(user.email);
  }

  @IsAuthorized()
  @Post()
  @HttpCode(HttpStatus.OK)
  add(@Req() req: Request, @Body() dto: AddDeleteItemCartDto) {
    const user = req.user as TJwtUser;
    return this.cartService.add(user.email, dto);
  }

  @IsAuthorized()
  @Delete()
  @HttpCode(HttpStatus.OK)
  delete(@Req() req: Request, @Body() dto: Pick<AddDeleteItemCartDto, 'itemId'>) {
    const user = req.user as TJwtUser;
    return this.cartService.delete(user.email, dto);
  }
}

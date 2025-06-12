import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [ItemModule, UserModule],
})
export class CartModule {}

import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { CurrencyModule } from 'src/currency/currency.module';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';
import { PaymentModule } from 'src/payment/payment.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [SyncController],
  providers: [SyncService],
  imports: [CurrencyModule, ItemModule, UserModule, PaymentModule, InvoiceModule, OrderModule],
})
export class SyncModule {}

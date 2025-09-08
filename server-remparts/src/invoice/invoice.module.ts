import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { ItemModule } from 'src/item/item.module';

@Module({
  providers: [InvoiceService],
  exports: [InvoiceService],
  imports: [ItemModule],
})
export class InvoiceModule {}

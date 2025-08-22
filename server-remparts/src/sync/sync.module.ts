import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { CurrencyModule } from 'src/currency/currency.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  controllers: [SyncController],
  providers: [SyncService],
  imports: [CurrencyModule, ItemModule],
})
export class SyncModule {}

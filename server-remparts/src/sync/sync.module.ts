import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  controllers: [SyncController],
  providers: [SyncService],
  imports: [CurrencyModule],
})
export class SyncModule {}

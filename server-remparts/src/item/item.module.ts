import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MeiliModule } from 'src/meili/meili.module';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
  imports: [MeiliModule],
})
export class ItemModule {}

import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MeiliModule } from 'src/meili/meili.module';

import { ItemModule } from 'src/item/item.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [MeiliModule, ItemModule, CategoryModule],
})
export class SearchModule {}

import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'nestjs-prisma';
import { ItemModule } from 'src/item/item.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [PrismaModule, ItemModule],
})
export class CategoryModule {}

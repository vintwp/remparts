import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PriceModule } from './price/price.module';
import { XmltreeModule } from './xmltree/xmltree.module';
import { DepartmentModule } from './department/department.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoryModule } from './category/category.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';
import { ItemModule } from './item/item.module';
import { BannerModule } from './banner/banner.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashService } from './hash/hash.service';
import { HashModule } from './hash/hash.module';
import { MeiliModule } from './meili/meili.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),

    MeiliModule,
    ScheduleModule.forRoot(),
    PriceModule,
    XmltreeModule,
    DepartmentModule,
    CategoryModule,
    ItemModule,
    BannerModule,
    RedisModule,
    HashModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}

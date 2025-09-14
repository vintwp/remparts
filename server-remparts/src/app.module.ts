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
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { HashService } from './hash/hash.service';
import { HashModule } from './hash/hash.module';
import { MeiliModule } from './meili/meili.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CurrencyModule } from './currency/currency.module';
import { CartModule } from './cart/cart.module';
import { ShippingModule } from './shipping/shipping.module';
import { SyncModule } from './sync/sync.module';
import { PaymentModule } from './payment/payment.module';
import { InvoiceModule } from './invoice/invoice.module';
import { OrderModule } from './order/order.module';

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
    RedisModule,
    HashModule,
    AuthModule,
    SearchModule,
    UserModule,
    MailModule,
    CurrencyModule,
    CartModule,
    ShippingModule,
    SyncModule,
    PaymentModule,
    InvoiceModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}

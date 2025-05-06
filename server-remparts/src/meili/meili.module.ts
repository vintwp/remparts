import { Module } from '@nestjs/common';
import { MeiliService } from './meili.service';
import { ConfigService } from '@nestjs/config';
import { MeiliSearch } from 'meilisearch';

const meiliClientProvider = {
  provide: 'MEILISEARCH_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new MeiliSearch({
      host: `http://${configService.get('MEILI_HOST')}:${configService.get('MEILI_PORT')}`,
      apiKey: configService.get('MEILI_MASTER_KEY'),
    });
  },
  inject: [ConfigService],
};

@Module({
  providers: [MeiliService, meiliClientProvider],
  exports: [MeiliService],
})
export class MeiliModule {}

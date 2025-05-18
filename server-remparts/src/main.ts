import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  app.setGlobalPrefix('api');

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT = ${PORT}`));
}
bootstrap();

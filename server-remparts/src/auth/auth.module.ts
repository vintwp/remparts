import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { getRecaptchaConfig } from 'src/config/recaptcha.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { getJwtConfig } from './config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getRecaptchaConfig,
    }),
  ],
})
export class AuthModule {}

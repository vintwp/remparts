import { ConfigService } from '@nestjs/config';
import { StrategyOptions } from 'passport-google-oauth20';

export function getGoogleOauthConfig(configService: ConfigService): StrategyOptions {
  return {
    clientID: configService.getOrThrow<string>('GOOGLE_OAUTH_CLIENT_ID'),
    clientSecret: configService.getOrThrow<string>('GOOGLE_OAUTH_CLIENT_SECRET'),
    callbackURL: configService.getOrThrow<string>('GOOGLE_OAUTH_CALLBACK_URL'),
    scope: ['email', 'profile'],
  };
}

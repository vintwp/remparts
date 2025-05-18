import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  GoogleCallbackParameters,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import { getGoogleOauthConfig } from '../config/google-oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super(getGoogleOauthConfig(configService));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, name, id } = profile;

    const user = {
      id,
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}

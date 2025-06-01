import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { isDev } from 'src/lib/utils';

export const getMailerConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: !isDev(configService) ? configService.getOrThrow<number>('MAIL_PORT') : 587,
    secure: !isDev(configService),
    auth: {
      user: configService.getOrThrow<string>('MAIL_USER'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `Remparts ${configService.getOrThrow<string>('MAIL_USER')}`,
  },
});

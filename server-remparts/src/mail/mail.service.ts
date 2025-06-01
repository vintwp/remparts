import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { ConfirmationTemplate } from './templates/confirmation.template';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('FRONTEND_URL');
    const html = await render(ConfirmationTemplate({ domain, token }));

    return this.sendMail(email, 'Confirm your email', html);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('FRONTEND_URL');
    const html = await render(PasswordRecoveryTemplate({ domain, token }));

    return this.sendMail(email, 'Reset your password', html);
  }

  private sendMail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}

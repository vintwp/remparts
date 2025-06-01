import { forwardRef, Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from '../auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MailModule, forwardRef(() => AuthModule), UserModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}

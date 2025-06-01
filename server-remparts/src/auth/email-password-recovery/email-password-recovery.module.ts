import { forwardRef, Module } from '@nestjs/common';
import { EmailPasswordRecoveryService } from './email-password-recovery.service';
import { EmailPasswordRecoveryController } from './email-password-recovery.controller';
import { AuthModule } from '../auth.module';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [forwardRef(() => AuthModule), UserModule, MailModule],
  controllers: [EmailPasswordRecoveryController],
  providers: [EmailPasswordRecoveryService],
})
export class EmailPasswordRecoveryModule {}

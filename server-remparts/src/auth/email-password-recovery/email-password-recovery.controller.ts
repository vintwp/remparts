import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { EmailPasswordRecoveryService } from './email-password-recovery.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('auth/recovery')
export class EmailPasswordRecoveryController {
  constructor(private readonly emailPasswordRecoveryService: EmailPasswordRecoveryService) {}

  @Recaptcha()
  @Post()
  @HttpCode(HttpStatus.OK)
  async recoveryPassword(@Body() dto: ResetPasswordDto) {
    return await this.emailPasswordRecoveryService.recoveryPassword(dto);
  }

  @Recaptcha()
  @Post(':token')
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() dto: NewPasswordDto, @Param('token') token: string) {
    return await this.emailPasswordRecoveryService.updatePassword(dto, token);
  }
}

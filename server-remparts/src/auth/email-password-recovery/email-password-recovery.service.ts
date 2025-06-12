import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import ms, { StringValue } from 'ms';
import { CustomPrismaService } from 'nestjs-prisma';
import { MailService } from 'src/mail/mail.service';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import * as bcrypt from 'bcrypt';
import { messagesFromServer } from '../../config/messagesFromServer';

@Injectable()
export class EmailPasswordRecoveryService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async recoveryPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const isExistUser = await this.userService.getByEmail(dto.email);

    if (!isExistUser) {
      throw new NotFoundException(messagesFromServer.auth.recovery.notFound.ua);
    }

    const recoveryPasswordToken = await this.generatePasswordRecoveryToken(isExistUser.email);

    await this.mailService.sendResetPasswordEmail(
      recoveryPasswordToken.email,
      recoveryPasswordToken.token,
    );

    return {
      message: messagesFromServer.auth.recovery.success.ua,
    };
  }

  async updatePassword(dto: NewPasswordDto, token: string): Promise<{ message: string }> {
    const isExistToken = await this.prismaService.client.emailToken.findUnique({
      where: {
        token,
        tokenType: TokenType.RECOVERY_PASSWORD,
      },
    });

    if (!isExistToken) {
      throw new NotFoundException(messagesFromServer.auth.recovery.tokenNotFound);
    }

    const hasExpired = new Date(isExistToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new NotFoundException(messagesFromServer.auth.recovery.tokenExpired);
    }

    const existUser = await this.userService.getByEmail(isExistToken.email);

    if (!existUser) {
      throw new NotFoundException(messagesFromServer.auth.recovery.notFound);
    }

    await this.userService.updateUser(existUser.email, {
      password: await bcrypt.hash(dto.password, 10),
    });

    return {
      message: messagesFromServer.auth.recovery.succesPasswordChanged.ua,
    };
  }
  private async generatePasswordRecoveryToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(
      Date.now() +
        ms(this.configService.getOrThrow<string>('EMAIL_CONFIRMATION_TOKEN_TTL') as StringValue),
    );

    const isExistToken = await this.prismaService.client.emailToken.findFirst({
      where: {
        email,
        tokenType: TokenType.RECOVERY_PASSWORD,
      },
    });

    if (isExistToken) {
      await this.prismaService.client.emailToken.delete({
        where: {
          id: isExistToken.id,
          tokenType: TokenType.RECOVERY_PASSWORD,
        },
      });
    }

    const recoveryPasswordToken = await this.prismaService.client.emailToken.create({
      data: {
        email,
        token,
        tokenType: TokenType.RECOVERY_PASSWORD,
        expiresIn,
      },
    });

    return recoveryPasswordToken;
  }
}

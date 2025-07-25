import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ms, { StringValue } from 'ms';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import { ConfigService } from '@nestjs/config';
import { TokenType, User } from '@prisma/client';
import { ConfirmationDto } from './dto/confirmation.dto';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { NotFoundError } from 'rxjs';
import { messagesFromServer } from '../../config/messagesFromServer';

@Injectable()
export class EmailConfirmationService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async sendVerificationToken(user: Omit<User, 'password'>) {
    const verificationToken = await this.generateVerificationToken(user.email);

    await this.mailService.sendConfirmationEmail(verificationToken.email, verificationToken.token);

    return true;
  }

  async newVerification(req: Request, dto: ConfirmationDto) {
    const isExistToken = await this.prismaService.client.emailToken.findUnique({
      where: {
        token: dto.token,
      },
    });

    if (!isExistToken) {
      throw new NotFoundException(messagesFromServer.auth.confirm.notFound.ua);
    }

    const hasExpired = new Date(isExistToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new NotFoundException(messagesFromServer.auth.confirm.expired.ua);
    }

    const { data: existUserData } = await this.userService.getByEmail(isExistToken.email);

    if (!existUserData) {
      throw new NotFoundException(messagesFromServer.auth.login.notFound.ua);
    }

    await this.userService.updateUser(existUserData.email, { isVerifiedEmail: true });

    await this.prismaService.client.emailToken.delete({
      where: {
        id: isExistToken.id,
      },
    });

    return {
      message: messagesFromServer.auth.confirm.success.ua,
    };
  }

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(
      Date.now() +
        ms(this.configService.getOrThrow<string>('EMAIL_CONFIRMATION_TOKEN_TTL') as StringValue),
    );

    const isExistToken = await this.prismaService.client.emailToken.findFirst({
      where: {
        email,
        tokenType: TokenType.VERIFICATION,
      },
    });

    if (isExistToken) {
      await this.prismaService.client.emailToken.delete({
        where: {
          id: isExistToken.id,
          tokenType: TokenType.VERIFICATION,
        },
      });
    }

    const verificationToken = await this.prismaService.client.emailToken.create({
      data: {
        email,
        token,
        tokenType: TokenType.VERIFICATION,
        expiresIn,
      },
    });

    return verificationToken;
  }
}

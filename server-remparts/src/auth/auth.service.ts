import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthPayload } from './types/googlePayload';
import { JwtPayload } from './types/jwtPayload';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { messagesFromServer } from '../config/messagesFromServer';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailConfirmationService: EmailConfirmationService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  private generateJwtToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  private auth(res: Response, user: JwtPayload) {
    const { accessToken, refreshToken } = this.generateJwtToken(user);

    return {
      user: { id: user.id, email: user.email, role: user.role },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(data: RegisterDto) {
    const { data: isUserExistData } = await this.userService.getByEmail(data.email);

    if (isUserExistData) {
      throw new ConflictException(messagesFromServer.auth.register.exist.ua);
    }

    const user = await this.userService.createUser({
      email: data.email,
      password: data.password,
    });

    await this.emailConfirmationService.sendVerificationToken(user);

    return {
      message: messagesFromServer.auth.register.success.ua,
    };
  }

  async login(res: Response, data: LoginDto) {
    const { email, password } = data;
    const { data: userData } = await this.userService.getByEmail(email);

    if (!userData) {
      throw new NotFoundException(messagesFromServer.auth.login.notFound.ua);
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      throw new NotFoundException(messagesFromServer.auth.login.notFound.ua);
    }

    if (!userData.isVerifiedEmail) {
      await this.emailConfirmationService.sendVerificationToken(userData);

      throw new UnauthorizedException(messagesFromServer.auth.login.unverified.ua);
    }

    if (userData.isBanned) {
      throw new ForbiddenException(messagesFromServer.auth.login.isBanned.ua);
    }

    const authData = await this.auth(res, {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      customerPriceTier: userData.customerPriceTier,
    });

    return { data: authData };
  }

  //  TODO : access and resfresh token should be valid at once. After refreshing access tokens - refresh token be added to blacklist in redis (with expiration time)
  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const { data: userData } = await this.userService.getByEmail(payload.email);

      if (!userData) throw new NotFoundException('User not found');

      return this.auth(res, {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        customerPriceTier: userData.customerPriceTier,
      });
    }
  }

  async logout(res: Response) {}

  async loginForGoogle(userFromGoogle: GoogleAuthPayload, res: Response) {
    const HASH_TTL = 180;

    const hash = uuidv4();
    const { data: userData } = await this.userService.getByEmail(userFromGoogle.email);

    if (userData && !userData.oauthId) {
      await this.userService.updateUser(userData.email, { oauthId: userFromGoogle.id });
    }

    if (userData && userData.oauthId !== userFromGoogle.id) {
      const error = encodeURIComponent(messagesFromServer.auth.login.oAuthError.ua);

      return res.redirect(
        `${this.configService.getOrThrow('FRONTEND_URL')}/api/auth/google/callback?error=${error}`,
      );
    }

    if (!userData) {
      const { id, email, role } = await this.userService.createUser({
        oauthId: userFromGoogle.id,
        email: userFromGoogle.email,
        isVerifiedEmail: true,
      });

      await this.redisClient.setex(hash, HASH_TTL, JSON.stringify({ id, email, role }));

      return res.redirect(
        `${this.configService.getOrThrow('FRONTEND_URL')}/api/auth/google/callback?token=${hash}`,
      );
    }

    await this.redisClient.setex(
      hash,
      HASH_TTL,
      JSON.stringify({ id: userData.id, email: userData.email, role: userData.role }),
    );

    return res.redirect(
      `${this.configService.getOrThrow('FRONTEND_URL')}/api/auth/google/callback?token=${hash}`,
    );
  }

  async loginCallback(hash: string) {
    const userFromRedis = await this.redisClient.get(hash);

    if (!userFromRedis) throw new NotFoundException('Hash is wrong or expired');

    const { id, email, role, customerPriceTier } = JSON.parse(userFromRedis) as Pick<
      User,
      'id' | 'email' | 'role' | 'customerPriceTier'
    >;

    await this.redisClient.del(hash);

    const auth = this.auth(null, { id, email, role, customerPriceTier });

    return { data: auth };
  }

  async validate(payload: JwtPayload) {
    const { data: userData } = await this.userService.getByEmail(payload.email);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = userData;

    return { data: result };
  }
}

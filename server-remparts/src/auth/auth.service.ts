import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import ms, { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { isDev } from 'src/lib';
import { GoogleAuthPayload } from './types/googlePayload';
import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  private setCookie(
    res: Response,
    cookieName: string,
    cookieValue: string,
    expiresIn: number,
    path?: string,
  ) {
    res.cookie(cookieName, cookieValue, {
      domain: this.COOKIE_DOMAIN,
      httpOnly: true,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
      maxAge: expiresIn,
      path: path || '/',
    });
  }

  private auth(res: Response, user: JwtPayload) {
    const { accessToken, refreshToken } = this.generateJwtToken(user);

    this.setCookie(
      res,
      'access_token',
      accessToken,
      ms(this.JWT_ACCESS_TOKEN_TTL as StringValue),
      '/api',
    );
    this.setCookie(
      res,
      'refresh_token',
      refreshToken,
      ms(this.JWT_REFRESH_TOKEN_TTL as StringValue),
      '/api/auth/refresh',
    );
  }

  async register(data: RegisterDto) {
    const isUserExist = await this.userService.getByEmail(data.email);

    if (isUserExist) {
      throw new ConflictException('User already exist. Please use another email');
    }

    const user = await this.userService.createUser({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    return user;
  }

  async login(res: Response, data: LoginDto) {
    const { email, password } = data;
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('User not found');
    }

    return this.auth(res, { id: user.id, email: user.email, role: user.role });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.userService.getByEmail(payload.email);

      if (!user) throw new NotFoundException('User not found');

      return this.auth(res, { id: user.id, email: user.email, role: user.role });
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'access_token', '', 0);
    this.setCookie(res, 'refresh_token', '', 0);
  }

  async loginForGoogle(userFromGoogle: GoogleAuthPayload, res: Response) {
    const user = await this.userService.getByEmail(userFromGoogle.email);

    if (!user) {
      await this.userService.createUser({
        oauthId: userFromGoogle.id,
        email: userFromGoogle.email,
        name: userFromGoogle.name,
      });

      return res.redirect(this.configService.getOrThrow('FRONTEND_URL'));
    }

    return this.auth(res, { id: user.id, email: user.email, role: user.role });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getByEmail(payload.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;

    return result;
  }
}

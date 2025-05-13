import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt.type';
import { Role } from '@prisma/client';
import { SignUp } from './dto/signup.dto';
import { SignIn } from './dto/signin.dto';
import { Request, Response } from 'express';
import { isDev } from 'src/lib';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.get('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = this.configService.get(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = this.configService.get('COOKIE_DOMAIN');
  }

  private generateTokens({
    id,
    email,
    role,
  }: {
    id: number;
    email: string;
    role: Role;
  }) {
    const payload: JwtPayload = { id, email, role };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  private setCookie(
    res: Response,
    cookie_name: string,
    value: string,
    expires: Date,
    path?: string,
  ) {
    res.cookie(cookie_name, value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: !isDev(this.configService) ? 'none' : 'lax',
      path: path || undefined,
    });
  }

  private auth(res: Response, { id, email, role }: JwtPayload) {
    const { access_token, refresh_token } = this.generateTokens({
      id,
      email,
      role,
    });

    this.setCookie(
      res,
      'refresh_token',
      refresh_token,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      '/api/auth/refresh',
    );

    this.setCookie(
      res,
      'access_token',
      refresh_token,
      new Date(Date.now() + 1000 * 60 * 15),
    );

    return { access_token };
  }

  async signin(res: Response, dto: SignIn) {
    try {
      const { email, password } = dto;

      const user = await this.userService.getByEmail(email);
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new NotFoundException('User or Password is incorrect');
      }

      return this.auth(res, { id: user.id, email, role: user.role });
    } catch (error) {
      throw error;
    }
  }

  async signup(res: Response, dto: SignUp) {
    try {
      const { email, password } = dto;
      const { id, role } = await this.userService.createUser({
        email,
        password,
      });

      return this.auth(res, { id, email, role });
    } catch (error) {
      throw error;
    }
  }

  async signout(res: Response) {
    this.setCookie(res, 'refresh_token', '', new Date(0));

    return true;
  }

  async refresh(req: Request, res: Response) {
    const refresh_token = req.cookies['refresh_token'];

    if (!refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: JwtPayload =
      await this.jwtService.verifyAsync(refresh_token);

    if (payload) {
      const user = await this.prismaService.client.user.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User was not found');
      }

      return this.auth(res, {
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.userService.getByEmail(payload.email);

      if (!user.isVerified) {
        throw new ForbiddenException(
          'You are not verified to use the site. Please Contact The Manager',
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

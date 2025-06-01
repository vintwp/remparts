import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Get,
  UseGuards,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwtPayload';
import { IsAuthorized } from './decorators/is-authorized.decorator';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { GoogleAuthPayload } from './types/googlePayload';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Recaptcha()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Recaptcha()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    return this.authService.login(res, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }

    const user = req.user as GoogleAuthPayload;

    return this.authService.loginForGoogle(user, res);
  }

  @Get('callback/:hash')
  async loginCallback(@Param('hash') hash: string) {
    const response = await this.authService.loginCallback(hash);

    return response;
  }

  @IsAuthorized()
  @Get('validate')
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: Request) {
    return this.authService.validate(req.user as JwtPayload);
  }
}

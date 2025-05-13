import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUp } from './dto/signup.dto';
import { SignIn } from './dto/signin.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Res({ passthrough: true }) res: Response, @Body() dto: SignUp) {
    return this.authService.signup(res, dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Res({ passthrough: true }) res: Response, @Body() dto: SignIn) {
    return this.authService.signin(res, dto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  async signout(@Res({ passthrough: true }) res: Response) {
    return this.authService.signout(res);
  }
}

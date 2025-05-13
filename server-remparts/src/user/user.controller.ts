import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ROLE, Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './user.service';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('loggedin')
  getLoggedIn(@Authorized() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Roles(ROLE.admin)
  @Get()
  getAllUsers(@Req() req: Request) {
    return this.userService.getAllUsers();
  }
}

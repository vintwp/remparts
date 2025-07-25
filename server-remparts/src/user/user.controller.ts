import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';

import { Request } from 'express';
import { IsAuthorized } from 'src/auth/decorators/is-authorized.decorator';
import { ValidateUserAccessById } from 'src/auth/decorators/validate-user-access-by-id.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsAuthorized('ADMIN')
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ValidateUserAccessById()
  @IsAuthorized()
  @Patch(':id')
  async updateUserData(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUserData(id, body);
  }

  @ValidateUserAccessById()
  @IsAuthorized()
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const {
      data: { password, ...rest },
    } = await this.userService.getById(+id);

    return { data: rest };
  }
}

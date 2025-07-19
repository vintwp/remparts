import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';
import { ROLE } from 'src/types';

export function IsAuthorized(...roles: ROLE[]) {
  return applyDecorators(
    Roles(roles.length ? roles : ['USER']),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

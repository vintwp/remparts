import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ROLE, Roles } from './roles.decorator';

export function IsAuthorized(...roles: ROLE[]) {
  return applyDecorators(
    Roles(roles.length ? roles : ['USER']),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ROLE, Roles, RoleByDB } from './roles.decorator';
import { Role } from '@prisma/client';

export function IsAuthorized(...roles: ROLE[]) {
  return applyDecorators(
    Roles(roles.length ? roles : ['USER']),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export enum ROLE {
  admin = 'ADMIN',
  user = 'USER',
  manager = 'MANAGER',
}

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);

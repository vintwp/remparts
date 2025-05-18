import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const RoleByDB = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

export type ROLE = (typeof RoleByDB)[keyof typeof RoleByDB];

export const Roles = (roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);

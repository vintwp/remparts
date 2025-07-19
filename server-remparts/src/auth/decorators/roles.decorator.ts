import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants';
import { ROLE } from 'src/types';

export const Roles = (roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);

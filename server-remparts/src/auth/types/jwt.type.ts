import { Role } from '@prisma/client';

export type JwtPayload = {
  id: number;
  email: string;
  role: Role;
};

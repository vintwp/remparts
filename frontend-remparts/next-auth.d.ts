import type { DefaultSession, DefaultUser } from '@auth/core';
import type { DefaultJWT } from 'next-auth/jwt';

import { UserRole } from '@/shared/types';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email: string | null;
    role: UserRole;
    access_token: string;
    refresh_token: string;
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    email: string;
    role: UserRole;
    access_token: string;
    refresh_token: string;
  }

  interface Session extends DefaultSession {
    access_token: string;
  }
}

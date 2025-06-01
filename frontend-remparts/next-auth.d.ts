import type { DefaultSession, DefaultUser } from '@auth/core';
import type { DefaultJWT } from 'next-auth/jwt';

type UserRole = 'ADMIN' | 'USER' | 'MANAGER';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    email?: string | null;
    role?: UserRole;
    access_token?: string;
    refresh_token?: string;
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: UserRole;
    access_token?: string;
    refresh_token?: string;
  }

  interface Session extends DefaultSession {
    access_token?: string;
  }
}

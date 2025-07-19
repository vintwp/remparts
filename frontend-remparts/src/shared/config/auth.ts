import NextAuth, { AuthError, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { fetch } from '@/shared/api';
import { AUTH_GOOGLE_OAUTH_CALLBACK_API, AUTH_LOGIN_API, AUTH_SECRET } from '@/shared/config';
import { UserRole as Role } from '@/shared/types';

type TCredentials = {
  email: string;
  password: string;
  captcha: string;
};

type TResponseUser = {
  user: Pick<User, 'email' | 'id'> & { role: Role };
  access_token: string;
  refresh_token: string;
};

// TODO add token rotation
// TODO add logout
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'credentials-by-email-password',
      credentials: {
        email: {},
        password: {},
        captcha: {},
      },
      async authorize(credentials) {
        const { email, password, captcha } = credentials as TCredentials;
        const request = await fetch.postData<TResponseUser>(
          AUTH_LOGIN_API,
          {
            email,
            password,
          } as TCredentials,
          {
            headers: {
              recaptcha: captcha,
            },
            cache: 'no-cache',
          },
        );

        if (!request.ok) {
          throw new AuthError(request.message || 'Unexpected authorization error');
        }

        const { user, access_token, refresh_token } = request.data;

        return {
          ...user,
          access_token,
          refresh_token,
        };
      },
    }),
    Credentials({
      id: 'credentials-by-google',
      credentials: {
        token: {},
      },

      async authorize(credentials) {
        const request = await fetch.getData<TResponseUser>(
          `${AUTH_GOOGLE_OAUTH_CALLBACK_API}/${credentials?.token}`,
          {
            cache: 'no-cache',
          },
        );

        if (!request.ok) {
          throw new AuthError(request.message || 'Unexpected authorization error');
        }

        const { user, access_token, refresh_token } = request.data;

        return {
          ...user,
          access_token,
          refresh_token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/api/login',
  },
  secret: AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { id, email, role, access_token, refresh_token } = user;

        return {
          ...token,
          id,
          email,
          access_token,
          refresh_token,
          role,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const userFromSession = session.user;

      if (!token.id || !token.email || !token.role || !token.access_token) {
        throw new AuthError('Missed id, email, role or access_token in session');
      }

      session.user = {
        ...userFromSession,
        id: token.id,
        role: token.role,
      };

      session.access_token = token.access_token;

      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});

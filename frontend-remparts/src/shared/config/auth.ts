import NextAuth, { AuthError, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { type Role } from '@/entities/user';

import { fetch } from '@/shared/api';
import { AUTH_GOOGLE_OAUTH_CALLBACK_API, AUTH_LOGIN_API, AUTH_SECRET } from '@/shared/config';

type TCredentials = {
  email: string;
  password: string;
  captcha: string;
};

type TResponseUser = {
  user: Pick<User, 'email'> & { role: Role };
  access_token: string;
  refresh_token: string;
};

// TODO add token rotation

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
        const { email, role, access_token, refresh_token } = user;

        return {
          ...token,
          access_token,
          refresh_token,
          email,
          role,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const userFromSession = session.user;

      session.user = {
        ...userFromSession,
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

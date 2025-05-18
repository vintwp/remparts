'use server';

import { fetch } from '@/shared/api';
import { AUTH_JWT_SIGNIN_API } from '@/shared/config';

type AuthData = {
  email: string;
  password: string;
};

export async function auth(data: AuthData) {
  const response = await fetch.postData<{ access_token: string }>(AUTH_JWT_SIGNIN_API, data);
}

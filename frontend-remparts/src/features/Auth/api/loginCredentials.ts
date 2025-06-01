'use server';

import { AuthError } from 'next-auth';

import { FetchResponse } from '@/shared/api';
import { signIn } from '@/shared/config/auth';

type AuthData = {
  email: string;
  password: string;
};

export async function loginCredentials(data: AuthData): Promise<FetchResponse<null>> {
  try {
    await signIn('credentials-by-email-password', { ...data, redirect: false });

    return { ok: true, data: null };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, status: 400, message: error.message.split('..')[0] };
    } else {
      return { ok: false, status: 500, message: 'Unexpected authorization error 333' };
    }
  }
}

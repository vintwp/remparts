'use server';

import { AuthError } from 'next-auth';

import { FetchResponse } from '@/shared/api';
import { signIn } from '@/shared/config/auth';

export async function loginGoogle(token: string): Promise<FetchResponse<null>> {
  try {
    await signIn('credentials-by-google', { token });

    return { ok: true, data: null };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, status: 400, message: error.message.split('..')[0] };
    } else {
      return { ok: false, status: 500, message: 'Unexpected authorization error' };
    }
  }
}

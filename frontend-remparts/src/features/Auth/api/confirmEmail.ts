'use server';

import { fetch } from '@/shared/api';
import { AUTH_CONFIRMATION_EMAIL_API } from '@/shared/config';

export async function confirmEmail(token: string) {
  return fetch.postData<null>(AUTH_CONFIRMATION_EMAIL_API, { token });
}

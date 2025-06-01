'use server';

import { fetch } from '@/shared/api';
import { AUTH_RECOVERY_EMAIL_API } from '@/shared/config';

export async function recoveryPassword({ email, captcha }: { email: string; captcha: string }) {
  return fetch.postData<null>(
    AUTH_RECOVERY_EMAIL_API,
    { email },
    {
      headers: {
        recaptcha: captcha,
      },
      cache: 'no-cache',
    },
  );
}

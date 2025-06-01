'use server';

import { fetch } from '@/shared/api';
import { AUTH_RECOVERY_EMAIL_API } from '@/shared/config';

export async function changePassword({
  password,
  token,
  captcha,
}: {
  password: string;
  token: string;
  captcha: string;
}) {
  return fetch.postData<null>(
    `${AUTH_RECOVERY_EMAIL_API}/${token}`,
    { password },
    {
      headers: {
        recaptcha: captcha,
      },
    },
  );
}

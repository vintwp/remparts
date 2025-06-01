'use server';

import { fetch } from '@/shared/api';
import { AUTH_REGISTER_API } from '@/shared/config/env.constants';

type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

export async function register(data: RegisterData) {
  const { captcha, ...rest } = data;

  return await fetch.postData<null>(AUTH_REGISTER_API, rest, {
    headers: {
      recaptcha: captcha,
    },
  });
}

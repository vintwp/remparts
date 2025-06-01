import { z } from 'zod';

import { isDev } from '@/shared/lib/utils';

const LoginSchema = z
  .object({
    email: z.string({ message: 'Введіть вашу email адресу' }).email('Некоректний формат email'),
    password: z
      .string({ message: 'Поле паролю не може бути порожнім' })
      .min(6, 'Довжина паролю повинна більше ніж 4 символи')
      .max(32, 'Довжина паролю повинна бути меншою ніж 32 символів'),
    captcha: z.string().optional(),
  })
  .superRefine(({ captcha }, ctx) => {
    if (!captcha) {
      if (isDev()) {
        return true;
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Підтвердіть, що ви не робот',
        path: ['captcha'],
      });
    }
  });

type TLoginSchema = z.infer<typeof LoginSchema>;

export { LoginSchema, type TLoginSchema };

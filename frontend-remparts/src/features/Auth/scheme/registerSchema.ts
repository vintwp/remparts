import { z } from 'zod';

import { isDev } from '@/shared/lib/utils';

const RegisterSchema = z
  .object({
    email: z.string({ message: 'Введіть вашу email адресу' }).email('Некоректний формат email'),
    password: z
      .string({ message: 'Пароль не може бути порожнім' })
      .min(6, 'Довжина паролю повинна більше ніж 6 символи')
      .max(32, 'Довжина паролю повинна бути меншою ніж 32 символів')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
        'Пароль повинен містити хоча б одну велику та малу літеру, та одну цифру',
      ),
    confirmPassword: z.string({ message: 'Пароль не може бути порожнім' }),
    captcha: z.string().optional(),
  })
  .superRefine(({ password, confirmPassword, captcha }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Паролі не співпадають',
        path: ['confirmPassword'],
      });
    }

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

type TRegisterSchema = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type TRegisterSchema };

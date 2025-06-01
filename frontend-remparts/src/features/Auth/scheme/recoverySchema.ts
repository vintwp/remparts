import { z } from 'zod';

import { isDev } from '@/shared/lib/utils';

const RecoverySchema = z
  .object({
    email: z.string({ message: 'Введіть вашу email адресу' }).email('Некоректний формат email'),
    captcha: z.string().optional(),
  })
  .superRefine(({ captcha }, ctx) => {
    if (isDev()) {
      return true;
    }
    if (!captcha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Підтвердіть, що ви не робот',
        path: ['captcha'],
      });
    }
  });

type TRecoverySchema = z.infer<typeof RecoverySchema>;

export { RecoverySchema, type TRecoverySchema };

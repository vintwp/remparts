import { z } from 'zod';

const updateUserDataSchema = z.object({
  email: z
    .string({ message: 'Введіть вашу email адресу' })
    .email('Некоректний формат email')
    .optional(),
  firstName: z
    .string({ message: 'Введіть ваше ім’я' })
    .min(2, 'Ім’я повинно бути не менше 2 символів'),
  lastName: z
    .string({ message: 'Введіть ваше прізвище' })
    .min(2, 'Прізвище повинно бути не менше 2 символів'),
  phoneNumber: z
    .string({ message: 'Введіть ваш номер телефону' })
    .length(12, 'Некоректний формат номеру телефону')
    .optional(),
  currentPassword: z.string({ message: 'Пароль не може бути порожнім' }).optional(),
  newPassword: z
    .string({ message: 'Пароль не може бути порожнім' })
    .min(6, 'Довжина паролю повинна більше ніж 6 символи')
    .max(32, 'Довжина паролю повинна бути меншою ніж 32 символів')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      'Пароль повинен містити хоча б одну велику та малу літеру, та одну цифру',
    )
    .optional(),
  city: z.object({ id: z.string(), name: z.string() }).optional(),
  warehouse: z.object({ id: z.string(), name: z.string() }).optional(),
});

type TUpdateUserDataSchema = z.infer<typeof updateUserDataSchema>;

export { updateUserDataSchema, type TUpdateUserDataSchema };

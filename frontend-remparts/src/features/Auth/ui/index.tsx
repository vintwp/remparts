'use client';

import { ReCaptcha } from '@/entities/captcha';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
} from '@/shared/ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInputError, FormInputInput, FormInputLabel, FormInputRoot } from '@/shared/component';

const LoginSchema = z.object({
  email: z.string({ message: 'Введіть вашу email адресу' }).email('Некоректний формат email'),
  password: z
    .string()
    .min(6, 'Довжина паролю повинна більше ніж 4 символи')
    .max(16, 'Довжина паролю повинна бути меншою ніж 16 символів'),
  captcha: z.string().nonempty('Підтвердіть, що ви не робот'),
});

type loginSchemaType = z.infer<typeof LoginSchema>;

export function Login() {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<loginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<loginSchemaType> = data => {
    console.log(data);
  };

  return (
    <Container className="py-5 md:py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Вхід</CardTitle>
            <CardDescription>Введіть вашу e-mail адресу та пароль для входу</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputRoot>
                    <FormInputLabel>Email</FormInputLabel>
                    <FormInputInput
                      onInput={e => {
                        onChange(e.currentTarget.value);
                        if (e.currentTarget.value) {
                          clearErrors('email');
                        }
                      }}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.email?.message}
                    />
                    <FormInputError error={errors.email?.message} />
                  </FormInputRoot>
                )}
                control={control}
                name="email"
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputRoot>
                    <FormInputLabel>Пароль</FormInputLabel>
                    <FormInputInput
                      onInput={e => {
                        onChange(e.currentTarget.value);
                        if (e.currentTarget.value) {
                          clearErrors('password');
                        }
                      }}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.password?.message}
                      type="password"
                    />
                    <FormInputError error={errors.password?.message} />
                  </FormInputRoot>
                )}
                control={control}
                name="password"
              />

              <Button
                type="submit"
                className="bg-primary-alt hover:bg-primary-alt/90 w-full"
                disabled={!isValid}
              >
                Увійти
              </Button>
            </div>

            <div className="mt-4 flex justify-center">
              <Controller
                name="captcha"
                control={control}
                render={({ field: { onChange } }) => (
                  <ReCaptcha
                    error={errors.captcha?.message}
                    onChange={v => {
                      onChange(v);
                      trigger('captcha');
                    }}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

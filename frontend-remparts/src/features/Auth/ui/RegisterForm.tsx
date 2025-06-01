'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ReCaptcha } from '@/entities/captcha';

import { FormInputError, FormInputInput, FormInputLabel, FormInputRoot } from '@/shared/component';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from '@/shared/ui';

import { register } from '../api';
import { RegisterSchema, TRegisterSchema } from '../scheme';

import { GoogleForm } from './GoogleForm';

export function RegisterForm() {
  const router = useRouter();
  const reCaptcha = useRef<ReCAPTCHA | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    clearErrors,
    setError,
    setValue,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = async data => {
    const captcha = data.captcha as string;

    const response = await register({ ...data, captcha });

    if (response.ok) {
      toast.success(response.message, { duration: 3000 });
      router.push('/');
      router.refresh();

      return;
    }

    if (!response.ok) {
      reCaptcha.current?.reset();

      setError('root', {
        type: 'deps',
        message: 'Помилка при реєстраціі',
      });

      toast.warning(response.message, { duration: 3000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="relative mx-auto max-w-sm overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Реєстрація</CardTitle>
            <CardDescription>
              {' '}
              Введіть вашу e-mail адресу та пароль для реєстрації нового користувача. Або виконайте
              реєстрацію через ваш Google акаунт.
            </CardDescription>
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
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInputRoot>
                    <FormInputLabel>Підтвердити пароль</FormInputLabel>
                    <FormInputInput
                      onInput={e => {
                        onChange(e.currentTarget.value);
                        if (e.currentTarget.value) {
                          clearErrors('confirmPassword');
                        }
                      }}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.confirmPassword?.message}
                      type="password"
                    />
                    <FormInputError error={errors.confirmPassword?.message} />
                  </FormInputRoot>
                )}
                control={control}
                name="confirmPassword"
              />

              <Button
                type="submit"
                className="bg-primary-alt hover:bg-primary-alt/90 w-full"
                disabled={!isValid || isSubmitting}
              >
                Увійти
              </Button>
            </div>

            <div className="mt-4 flex justify-center">
              <Controller
                name="captcha"
                control={control}
                render={() => (
                  <ReCaptcha
                    error={errors.captcha?.message}
                    onChange={v => setValue('captcha', v || '', { shouldValidate: true })}
                    ref={reCaptcha}
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <div className="relative">
                <Separator />
                <span
                  className="text-additional absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 bg-white px-2
                    text-xs"
                >
                  або
                </span>
              </div>
              <GoogleForm disabled={isSubmitting} />
            </div>

            <div className="mt-6 flex items-center justify-center text-sm text-black/80">
              <p>У вас вже є акаунт? </p>
              <Button
                variant="link"
                asChild
                className="px-2 py-0"
              >
                <Link href="/api/login">Увійти</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

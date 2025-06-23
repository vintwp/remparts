'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startHolyLoader } from 'holy-loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { mutate } from 'swr';

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

import { loginCredentials } from '../api/loginCredentials';
import { LoginSchema, TLoginSchema } from '../scheme';

import { GoogleForm } from './GoogleForm';

export function LoginForm() {
  const [isIncorrectCredentialsOnce, setIsIncorrectCredentialsOnce] = useState<boolean>(false);
  const router = useRouter();
  const reCaptcha = useRef<ReCAPTCHA | null>(null);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    clearErrors,
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async data => {
    const response = await loginCredentials(data);

    if (response.ok) {
      startHolyLoader();
      router.push('/');
      router.refresh();

      // refresh user after login
      await mutate('authorization');

      // refresh cart after login
      await mutate('cart');
      return;
    }

    if (!response.ok) {
      setIsIncorrectCredentialsOnce(true);
      reCaptcha.current?.reset();

      setError('root', {
        type: 'deps',
        message: 'Невірні дані для входу, перевірте ще раз',
      });

      if (response.status === 401) {
        toast.info(response.message, { duration: 2000 });

        return;
      }

      if (response.status === 404) {
        toast.error(response.message, { duration: 2000 });
        setError('root.serverError', {
          type: '404',
        });
        return;
      }

      toast.warning(response.message, { duration: 2000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="relative mx-auto max-w-sm overflow-hidden">
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

              {isIncorrectCredentialsOnce && (
                <div className="text-right">
                  <Link
                    className="text-right text-xs text-black/80 underline hover:text-black"
                    href="/api/auth/recovery"
                  >
                    Забули пароль?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                className="bg-primary-alt hover:bg-primary-alt/90 w-full"
                disabled={!isValid || isSubmitting}
              >
                Увійти
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center">
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
              <p>У вас немає акаунту? </p>
              <Button
                variant="link"
                asChild
                className="px-2 py-0"
              >
                <Link href="/api/register">Зареєструватись</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

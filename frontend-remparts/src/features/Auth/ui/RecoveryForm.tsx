'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ReCaptcha } from '@/entities/captcha';

import { FormInputError, FormInputInput, FormInputLabel, FormInputRoot } from '@/shared/component';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';

import { recoveryPassword } from '../api';
import { RecoverySchema, type TRecoverySchema } from '../scheme';

export function RecoveryForm() {
  const router = useRouter();
  const reCaptcha = useRef<ReCAPTCHA | null>(null);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    clearErrors,
    setError,
  } = useForm<TRecoverySchema>({
    resolver: zodResolver(RecoverySchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<TRecoverySchema> = async data => {
    const response = await recoveryPassword({ email: data.email, captcha: data.captcha as string });

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
        message: 'Невірні дані для відновлення паролю',
      });

      if (response.status === 404) {
        toast.error(response.message, { duration: 3000 });
        setError('root.serverError', {
          type: '404',
        });
        return;
      }

      toast.warning(response.message, { duration: 3000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="relative mx-auto max-w-sm overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Відновлення доступу на сайт</CardTitle>
            <CardDescription>Введіть вашу e-mail адресу</CardDescription>
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

              <Button
                type="submit"
                className="bg-primary-alt hover:bg-primary-alt/90 w-full"
                disabled={!isValid || isSubmitting}
              >
                Відновити
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
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

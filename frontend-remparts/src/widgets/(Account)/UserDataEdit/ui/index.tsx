'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { withMask } from 'use-mask-input';

import { getUser, updateUser } from '@/entities/user';

import { FormInputError, FormInputInput, FormInputLabel, FormInputRoot } from '@/shared/component';
import { useAuth } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import { TUpdateUserDataSchema, updateUserDataSchema } from '../scheme';

import { SelectShipping } from '@/features';

export function UpdateUserData() {
  const { auth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty, dirtyFields },
    clearErrors,
    setError,
    setValue,
    reset,
    getValues,
  } = useForm<TUpdateUserDataSchema>({
    resolver: zodResolver(updateUserDataSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<TUpdateUserDataSchema> = async data => {
    if (!auth.user || !auth.access_token) {
      return;
    }

    try {
      const request = await updateUser(auth.user.id, data, auth.access_token);

      if (!request.ok) {
        toast.error(request.message || 'Помилка при оновленні даних користувача', {
          duration: 1500,
        });
        return;
      }

      toast.success(request.message);
      reset({
        firstName: request.data.firstName,
        lastName: request.data.lastName,
        email: request.data.email,
        phoneNumber: request.data.phoneNumber,
        city: request.data.city || undefined,
        warehouse: request.data.warehouse || undefined,
        currentPassword: undefined,
        newPassword: undefined,
      });
    } catch {
      toast.error('Помилка при оновленні даних користувача', { duration: 1500 });
    }
  };

  useEffect(() => {
    async function getUserById() {
      if (!auth.user?.id || !auth.access_token) {
        return;
      }
      const request = await getUser(auth.user.id, auth.access_token);
      if (!request.ok) {
        setError('root', {
          message: request.message || 'Error getting data from server',
        });
        return;
      }

      reset({
        firstName: request.data.firstName,
        lastName: request.data.lastName,
        email: request.data.email,
        phoneNumber: request.data.phoneNumber,
        city: request.data.city || undefined,
        warehouse: request.data.warehouse || undefined,
      });
    }
    getUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputRoot className="w-full">
                  <FormInputLabel>Ім&apos;я</FormInputLabel>
                  <FormInputInput
                    onInput={e => {
                      onChange(e.currentTarget.value);
                      if (e.currentTarget.value) {
                        clearErrors('firstName');
                      }
                    }}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.firstName?.message}
                  />
                  <FormInputError error={errors.firstName?.message} />
                </FormInputRoot>
              )}
              control={control}
              name="firstName"
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputRoot className="w-full">
                  <FormInputLabel>Прізвище</FormInputLabel>
                  <FormInputInput
                    onInput={e => {
                      onChange(e.currentTarget.value);
                      if (e.currentTarget.value) {
                        clearErrors('lastName');
                      }
                    }}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.lastName?.message}
                  />
                  <FormInputError error={errors.lastName?.message} />
                </FormInputRoot>
              )}
              control={control}
              name="lastName"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputRoot className="w-full">
                  <FormInputLabel>Електронна Пошта</FormInputLabel>
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
                    disabled
                  />
                  <FormInputError error={errors.email?.message} />
                </FormInputRoot>
              )}
              control={control}
              name="email"
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputRoot className="w-full">
                  <FormInputLabel>Телефон</FormInputLabel>
                  <FormInputInput
                    ref={withMask('phone', {
                      mask: '+38 (999) 999 99 99',
                      placeholder: '+38 (___) ___-__-__',
                    })}
                    value={value?.slice(2)}
                    onBlur={onBlur}
                    error={!!errors.phoneNumber?.message}
                    onChange={v => {
                      onChange(v.replace(/\D/g, ''));
                      if (v) {
                        clearErrors('phoneNumber');
                      }
                    }}
                  />
                  <FormInputError error={''} />
                </FormInputRoot>
              )}
              control={control}
              name="phoneNumber"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputRoot className="w-full">
                  <FormInputLabel>Поточний пароль</FormInputLabel>
                  <FormInputInput
                    onInput={e => {
                      onChange(e.currentTarget.value);
                      if (e.currentTarget.value) {
                        clearErrors('currentPassword');
                      }
                    }}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.currentPassword?.message}
                    type="password"
                  />
                  <FormInputError error={''} />
                </FormInputRoot>
              )}
              control={control}
              name="currentPassword"
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputRoot className="w-full">
                  <FormInputLabel>Новий пароль</FormInputLabel>
                  <FormInputInput
                    onInput={e => {
                      onChange(e.currentTarget.value);
                      if (e.currentTarget.value) {
                        clearErrors('newPassword');
                      }
                    }}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.newPassword?.message}
                    disabled={!dirtyFields.currentPassword}
                    type="password"
                  />
                  <FormInputError error={errors.newPassword?.message} />
                </FormInputRoot>
              )}
              control={control}
              name="newPassword"
            />
          </div>
          <div>
            <SelectShipping
              city={getValues('city')}
              warehouse={getValues('warehouse')}
              onChangeCity={v => setValue('city', v, { shouldDirty: true })}
              onChangeWarehouse={v =>
                setValue('warehouse', v, {
                  shouldDirty: true,
                })
              }
            />
          </div>

          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          <div className="flex justify-center gap-4 md:justify-end">
            {isDirty && (
              <Button
                variant="destructive"
                onClick={() => reset()}
              >
                Відмінити
              </Button>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !isDirty || !isValid}
            >
              Зберегти
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

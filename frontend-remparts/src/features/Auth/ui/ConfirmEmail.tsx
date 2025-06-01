'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { delay } from '@/shared/lib/utils';
import { Spinner } from '@/shared/ui';

import { confirmEmail } from '../api';

function LoadingLayout({ loading = false, message = '' }: { loading?: boolean; message?: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {!loading && message && <p className="z-10 text-3xl">{message}</p>}
      {loading && <Spinner size="large" />}
    </div>
  );
}
export function ConfirmEmail({ token }: { token: string }) {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function confirm(token: string) {
      const response = await confirmEmail(token);
      setMessage(response.message || 'Помилка при підтвердженні емейлу');
      setIsLoading(false);
      await delay(3000);
      router.push('/');
    }

    if (!token) {
      setMessage('Токен підтвердження емейлу не знайдено, перевірте його або запросіть новий');
      setIsLoading(false);
      delay(3000).then(() => router.push('/'));

      return;
    }

    confirm(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingLayout
      loading={isLoading}
      message={message}
    />
  );
}

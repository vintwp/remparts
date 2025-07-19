'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

import { AUTH_GOOGLE_FRONTEND, FRONTEND_DOMAIN } from '@/shared/config';
import { Button } from '@/shared/ui';

import { getAuth } from '../api';

type Props = {
  disabled?: boolean;
};

export function GoogleForm({ disabled = false }: Props) {
  const router = useRouter();
  const modal = useRef<Window | null>(null);

  const handleModalWindowMessage = async (event: MessageEvent) => {
    if (event.origin !== FRONTEND_DOMAIN) {
      return;
    }

    if (typeof event.data !== 'string') {
      return;
    }

    try {
      const eventData = JSON.parse(event.data);

      if (eventData.type !== 'auth') {
        toast.error('Невірний тип повідомлення');
        return;
      }

      if (eventData.error) {
        toast.error(eventData.error);
        return;
      }

      if (eventData.success) {
        const isAuth = await getAuth();

        toast.success(eventData.success);

        await mutate('auth');
        await mutate(['cart', isAuth?.access_token]);

        router.push('/');
        router.refresh();

        return;
      }
    } catch {
      toast.info('Неочікувана помилка, перезавантажте сторінку');
    }
  };
  const createModalWindow = () => {
    modal.current = window.open(
      AUTH_GOOGLE_FRONTEND,
      'Google Auth Callback',
      'width=500,height=500,norefferer',
    );

    if (modal.current) {
      window.addEventListener('message', handleModalWindowMessage);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('message', handleModalWindowMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      className="mt-4 w-full hover:bg-transparent hover:text-black/80"
      onClick={createModalWindow}
      disabled={disabled}
    >
      <Image
        src="/icons/google.png"
        alt="Google"
        width={18}
        height={18}
      />
      <span>Продовжити через Google</span>
    </Button>
  );
}

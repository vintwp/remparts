'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Suspense } from 'react';

import { loginGoogle } from '@/features/Auth';

import { FRONTEND_DOMAIN } from '@/shared/config';

function SignInGoogle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function login(token: string) {
      await loginGoogle(token);

      if (typeof window !== 'undefined') {
        const success = JSON.stringify({ type: 'auth', success: 'Ви успішно увійшли' });
        window.opener.postMessage(success, FRONTEND_DOMAIN);
        window.close();
      }
    }

    const error = searchParams.get('error');
    const token = searchParams.get('token');

    if (error) {
      if (typeof window !== 'undefined') {
        window.opener.postMessage(JSON.stringify({ type: 'auth', error }), FRONTEND_DOMAIN);
        window.close();
      }
    }

    if (token) {
      debugger;
      login(token);
    }
  }, [router, searchParams]);

  return <div className="flex min-h-screen items-center justify-center">Переадресація</div>;
}

export function SignInGoogleCallback() {
  return (
    <Suspense>
      <SignInGoogle />
    </Suspense>
  );
}

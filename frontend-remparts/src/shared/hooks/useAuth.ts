'use client';

import { Session } from 'next-auth';
import useSWR from 'swr';

import { fetch } from '@/shared/api';

export async function authFetcher() {
  const res = await fetch.getData<Session>('/api/auth/validate');

  if (!res.ok) {
    throw new Error('Not authorized');
  }

  return res.data;
}

export function useAuth() {
  const { data, error } = useSWR('auth', () => authFetcher(), {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnFocus: false,
    refreshInterval: 1000 * 60 * 12,
  });

  return {
    auth: data as Session,
    isLoading: !error && !data,
    isError: !!error,
  };
}

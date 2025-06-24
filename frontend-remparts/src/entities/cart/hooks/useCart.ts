'use client';

import useSWR from 'swr';

import { cartFetcher } from '../swr';

export function useCart(accessToken: string | undefined = '') {
  const { data, error } = useSWR(
    !!accessToken ? ['cart', accessToken] : null,
    () => cartFetcher(accessToken),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    },
  );

  return {
    cart: data,
    isLoading: !error && !data,
    isError: !!error,
  };
}

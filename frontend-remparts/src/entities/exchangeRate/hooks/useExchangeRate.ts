'use client';

import useSWR from 'swr';

import { getExchangeRate } from '../api/getExchangeRate';

export function useExchangeRate() {
  const { data, error } = useSWR(
    'exchangeRate',
    async () => {
      const res = await getExchangeRate();

      if (!res.ok) {
        throw new Error(res.message || 'Error while getting exchange rate');
      }

      return res.data;
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshInterval: 1000 * 60 * 60,
    },
  );

  return {
    exchangeRate: data,
    isLoading: !error && !data,
    isError: !!error,
  };
}

'use client';

import useSWR from 'swr';

import { getCart } from '../api';
import { Cart } from '../types';

const fetcher = async (accessToken: string): Promise<Cart> => {
  const res = await getCart(accessToken);

  if (!res.ok) {
    throw new Error(res.message || 'Error while getting cart');
  }

  return res.data;
};

export function useCart(accessToken: string) {
  const { data, error } = useSWR(!!accessToken ? 'cart' : null, () => fetcher(accessToken), {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

  return {
    cart: data,
    isLoading: !error && !data,
    isError: !!error,
  };
}

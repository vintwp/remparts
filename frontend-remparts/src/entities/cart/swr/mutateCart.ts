'use client';

import { mutate } from 'swr';

import { Cart } from '../types';

import { cartFetcher } from './fetcher';

export const mutateCart = async (accessToken: string | undefined = '') => {
  if (!accessToken) {
    return;
  }

  try {
    const res = await mutate(['cart', accessToken], () => cartFetcher(accessToken), {
      revalidate: true,
    });

    return res as Cart;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error('Помилка при оновленні кошика');
  }
};

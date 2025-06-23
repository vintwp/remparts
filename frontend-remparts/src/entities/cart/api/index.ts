'use server';

import { fetch } from '@/shared/api';
import { CART_API } from '@/shared/config';

import { Cart } from '../types';

export async function addToCart(itemId: number, itemQty: number = 1, accessToken: string) {
  return fetch.postData<Cart>(
    CART_API,
    { itemId, itemQty },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export async function getCart(accessToken: string) {
  return fetch.getData<Cart>(CART_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function deleteFromCart(itemId: number[], accessToken: string) {
  return fetch.deleteData(
    CART_API,
    { itemId: [...itemId] },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

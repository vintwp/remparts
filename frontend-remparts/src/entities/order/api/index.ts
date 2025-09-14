'use server';

import { fetch } from '@/shared/api';
import { ORDER_API } from '@/shared/config';

import { CreateOrderItem } from '../types';

async function createOrder(items: CreateOrderItem[], accessToken: string) {
  return fetch.postData<CreateOrderItem[]>(ORDER_API, items, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function getOrders(accessToken: string) {
  return fetch.getData<CreateOrderItem[]>(ORDER_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function getOrder(id: string, accessToken: string) {}

export { createOrder, getOrders, getOrder };

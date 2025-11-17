'use server';

import { FetchResponse, fetch } from '@/shared/api';
import { ORDER_API } from '@/shared/config';

import { CreateOrderItem, Order } from '../types';

async function createOrder(items: CreateOrderItem[], accessToken: string) {
  return fetch.postData<CreateOrderItem[]>(ORDER_API, items, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function getOrder(
  userId: undefined,
  orderId: undefined,
  accessToken: string,
): Promise<FetchResponse<Order[]>>;
async function getOrder(
  userId: string,
  orderId: undefined,
  accessToken: string,
): Promise<FetchResponse<Order[]>>;
async function getOrder(
  userId: string,
  orderId: string,
  accessToken: string,
): Promise<FetchResponse<Order>>;
async function getOrder<T extends Order>(
  userId: string | undefined,
  orderId: string | undefined,
  accessToken: string,
): Promise<FetchResponse<T[] | T>> {
  return fetch.getData<T>(
    `${ORDER_API}${userId ? `/${userId}` : ''}${orderId ? `/${orderId}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export { createOrder, getOrder as getOrders, getOrder };

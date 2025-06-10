'use server';

import { fetch } from '@/shared/api';
import { CURRENCY_API } from '@/shared/config';

export async function getExchangeRate() {
  return fetch.getData<number>(CURRENCY_API, {
    cache: 'no-cache',
  });
}

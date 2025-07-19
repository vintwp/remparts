'use server';

import { fetch } from '@/shared/api';
import { SHIPPING_CITY_API, SHIPPING_WAREHOUSE_API } from '@/shared/config';

import { Place } from '../types';

export async function getShippingCities(name: string = '') {
  return fetch.postData<Place[]>(`${SHIPPING_CITY_API}`, {
    name,
  });
}

export async function getShippingWarehouses(cityId: string, warehouseName: string = '') {
  return fetch.postData<Place[]>(`${SHIPPING_WAREHOUSE_API}`, {
    cityId,
    warehouseName,
  });
}

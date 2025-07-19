'use server';

import { fetch } from '@/shared/api';
import { USER_API } from '@/shared/config';
import { User } from '@/shared/types';

export async function getUser(id: string, accessToken: string) {
  return fetch.getData<User>(`${USER_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function updateUser(id: string, data: Partial<User>, accessToken: string) {
  return fetch.patchData<User>(`${USER_API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getArea() {}

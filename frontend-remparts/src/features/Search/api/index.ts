'use server';

import { fetch } from '@/shared/api';
import { SEARCH_API } from '@/shared/config';

import { TSearch } from '../types';

const getSearch = async (query: string, searchParams?: string, accessToken?: string) => {
  const data = await fetch.getData<TSearch>(
    `${SEARCH_API}?query=${query}${searchParams ? `&${searchParams}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    },
  );

  return data;
};

export { getSearch };

'use server';

import { SEARCH_API } from '@/shared/config';
import { fetch } from '@/shared/api';
import { TSearch } from '../types';

const getSearch = async (query: string, searchParams?: string) => {
  const data = await fetch.getData<TSearch>(
    `${SEARCH_API}?query=${query}${searchParams ? `&${searchParams}` : ''}`,
    {
      cache: 'no-store',
    },
  );

  return data;
};

export { getSearch };

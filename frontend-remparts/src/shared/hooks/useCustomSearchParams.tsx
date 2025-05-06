'use client';

import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams as useSearchParamsNext,
} from 'next/navigation';

export function createURLSearchParams(
  param: string,
  value: number | number[] | string | string[] | boolean,
  currentSearchParams: ReadonlyURLSearchParams,
) {
  const search = new URLSearchParams(currentSearchParams.toString());

  // in no value - remove property from search string

  if (!value) {
    search.delete(param);

    return search;
  }

  if (Array.isArray(value)) {
    search.delete(param);

    if (!value.length) {
      search.delete(param);

      return search;
    }

    for (const val of value) {
      search.append(param, val.toString());
    }

    return search;
  }

  if (param && (!value || (Array.isArray(value) && !value.length))) {
    search.delete(param);

    return search;
  }

  search.delete(param);
  search.append(param, value.toString());

  return search;
}

export function useCustomSearchParams(param: string) {
  const path = usePathname();
  const paramsNext = useSearchParamsNext();

  const createPath = (
    value: number | number[] | string | string[] | boolean,
    deletePage = false,
  ) => {
    const params = createURLSearchParams(param, value, paramsNext);

    if (deletePage) {
      params.delete('page');
    }

    return `${path}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  return {
    param,
    paramValues: new URLSearchParams(paramsNext).getAll(param),
    createPath,
  };
}

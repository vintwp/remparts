import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createURLSearchParams<T extends number | string>(
  param: string,
  value: T | T[] | undefined,
) {
  const search = new URLSearchParams();

  if (!value) {
    return search;
  }

  if (Array.isArray(value)) {
    for (const val of value) {
      search.append(param, val.toString());
    }

    return search;
  }

  search.append(param, value.toString());

  return search;
}

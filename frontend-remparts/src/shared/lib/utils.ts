import { type ClassValue, clsx } from 'clsx';
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

export function validateEmail(email: string) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return regex.test(email);
}

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

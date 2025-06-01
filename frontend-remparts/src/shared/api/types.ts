type FetchSuccess<T> = {
  ok: true;
  data: T;
  message?: string;
};

type FetchError = {
  ok: false;
  status: number;
  message: string;
};

type FetchResponse<T> = FetchSuccess<T> | FetchError;

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type { FetchResponse, FetchSuccess, FetchError, JsonValue };

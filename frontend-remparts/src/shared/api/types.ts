class ErrorApi extends Error {
  public readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ErrorApi';
    Object.setPrototypeOf(this, ErrorApi.prototype);
  }
}

type FetchOk<T> = {
  ok: true;
  data: T;
  message?: string;
};

type FetchNoOk = {
  ok: false;
  status: number;
  message: string;
};

type FetchApi<T> = FetchOk<T> | FetchNoOk;

export { type FetchApi, ErrorApi };

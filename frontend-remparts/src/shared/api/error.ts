class ErrorApi extends Error {
  public readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ErrorApi';
    Object.setPrototypeOf(this, ErrorApi.prototype);
  }
}

export { ErrorApi };

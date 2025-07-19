type NovaPoshtaReponseBody = {
  success: true | false;
  errors: string[];
  warnings: string[];
  info: Record<string, string | number>;
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
};

export type NovaPoshtaResponse<T> = NovaPoshtaReponseBody & {
  data: Array<T>;
};

export type NovaPoshtaResponseExtended<T> = NovaPoshtaReponseBody & {
  data: Array<{ TotalCount: number; Addresses: T[] }>;
};

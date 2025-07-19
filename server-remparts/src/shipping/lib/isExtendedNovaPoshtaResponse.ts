import { NovaPoshtaResponse, NovaPoshtaResponseExtended } from '../types/Response';

export function isExtendedNovaPoshtaResponse<T>(
  response: NovaPoshtaResponse<T> | NovaPoshtaResponseExtended<T>,
): response is NovaPoshtaResponseExtended<T> {
  if (!Array.isArray(response.data)) {
    return false;
  }

  if (
    typeof response.data[0] === 'object' &&
    'TotalCount' in response.data[0] &&
    'Addresses' in response.data[0]
  ) {
    return true;
  }

  return false;
}

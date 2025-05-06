/* eslint-disable import/no-anonymous-default-export */
import { ErrorApi, type FetchApi } from './types';

class Fetch {
  async getData<T>(url: string, config: RequestInit = {}): Promise<FetchApi<T>> {
    return fetch(url, config)
      .then(async response => {
        if (!response.ok) {
          throw new ErrorApi(response.statusText, response.status);
        }

        return response.json().then(data => ({ data, message: response.statusText }));
      })
      .then(data => {
        return {
          ok: true as const,
          data: data.data as T,
          message: data.message,
        };
      })
      .catch(error => {
        if (error instanceof ErrorApi) {
          return { ok: false, status: error.status, message: error.message };
        } else {
          return { ok: false, status: 500, message: 'Unexpected internal error' };
        }
      });
  }
}

export default new Fetch();

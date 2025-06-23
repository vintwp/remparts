/* eslint-disable import/no-anonymous-default-export */
import { ErrorApi } from './error';
import { FetchResponse, JsonValue } from './types';

class Fetch {
  async getData<T>(url: string, config: RequestInit = {}): Promise<FetchResponse<T>> {
    return fetch(url, { method: 'GET', ...config })
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

  async postData<T, K = Record<string, JsonValue>>(
    url: string,
    body: K,
    config: RequestInit = {},
  ): Promise<FetchResponse<T>> {
    try {
      const { headers, ...restConfig } = config;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {}),
        },
        body: JSON.stringify(body),
        ...restConfig,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new ErrorApi(error.message || 'Unexpected internal error', response.status);
        }

        throw new ErrorApi('Unexpected internal error', response.status);
      }

      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        return {
          ok: true as const,
          data: null as T,
        };
      }

      const data = await response.json();

      return {
        ok: true as const,
        data: data as T,
        message: data.message,
      };
    } catch (error) {
      if (error instanceof ErrorApi) {
        return { ok: false, status: error.status, message: error.message };
      } else {
        return { ok: false, status: 500, message: 'Unexpected internal error' };
      }
    }
  }

  async deleteData<T, K = Record<string, JsonValue>>(
    url: string,
    body: K,
    config: RequestInit = {},
  ): Promise<FetchResponse<T>> {
    try {
      const { headers, ...restConfig } = config;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {}),
        },
        body: JSON.stringify(body),
        ...restConfig,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new ErrorApi(error.message || 'Unexpected internal error', response.status);
        }

        throw new ErrorApi('Unexpected internal error', response.status);
      }

      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        return {
          ok: true as const,
          data: null as T,
        };
      }

      const data = await response.json();

      return {
        ok: true as const,
        data: data.data as T,
        message: data.message,
      };
    } catch (error) {
      if (error instanceof ErrorApi) {
        return { ok: false, status: error.status, message: error.message };
      } else {
        return { ok: false, status: 500, message: 'Unexpected internal error' };
      }
    }
  }
}

export default new Fetch();

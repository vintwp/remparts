export type CookieName = 'access_token' | 'refresh_token';

type CookiePath = {
  [k in CookieName]: string;
};

export const cookiePath: CookiePath = {
  access_token: '/api',
  refresh_token: '/api/auth/refresh',
};

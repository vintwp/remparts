function getEnvVar(key: string) {
  const envVar = process.env[key];

  if (envVar === undefined) {
    return '';
  }

  return envVar;
}

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
export const DEPARTMENT_API = getEnvVar('DEPARTMENT_API');
export const CATEGORY_API = getEnvVar('CATEGORY_API');
export const BANNER_API = getEnvVar('BANNER_API');
export const SEARCH_API = getEnvVar('SEARCH_API');
export const ALL_USERS = getEnvVar('USER_GETALL');
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export const RECAPTCHA_SECRET_KEY = getEnvVar('RECAPTCHA_SECRET_KEY');
export const AUTH_JWT_SIGNUP_API = getEnvVar('AUTH_JWT_SIGNUP_API');
export const AUTH_JWT_SIGNIN_API = getEnvVar('AUTH_JWT_SIGNIN_API');
export const AUTH_JWT_REFRESH_API = getEnvVar('AUTH_JWT_SIGNUP_API');
export const AUTH_JWT_SIGNOUT_API = getEnvVar('AUTH_JWT_SIGNOUT_API');
export const AUTH_GOOGLE_OAUTH_API = getEnvVar('AUTH_GOOGLE_OAUTH_API');

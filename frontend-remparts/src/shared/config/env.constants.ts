function getEnvVar(key: string) {
  const envVar = process.env[key];

  if (envVar === undefined) {
    return '';
  }

  return envVar;
}

export const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
export const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
export const DEPARTMENT_API = getEnvVar('DEPARTMENT_API');
export const CATEGORY_API = getEnvVar('CATEGORY_API');
export const BANNER_API = getEnvVar('BANNER_API');
export const SEARCH_API = getEnvVar('SEARCH_API');
export const ALL_USERS = getEnvVar('USER_GETALL');
export const CURRENCY_API = getEnvVar('CURRENCY_API');
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export const AUTH_REGISTER_API = getEnvVar('AUTH_REGISTER_API');
export const AUTH_LOGIN_API = getEnvVar('AUTH_LOGIN_API');
export const AUTH_REFRESH_API = getEnvVar('AUTH_REFRESH_API');
export const AUTH_LOGOUT_API = getEnvVar('AUTH_LOGOUT_API');
export const AUTH_GOOGLE_OAUTH_API = getEnvVar('AUTH_GOOGLE_OAUTH_API');
export const AUTH_GOOGLE_OAUTH_CALLBACK_API = getEnvVar('AUTH_GOOGLE_OAUTH_CALLBACK_API');
export const AUTH_CONFIRMATION_EMAIL_API = getEnvVar('AUTH_CONFIRMATION_EMAIL_API');
export const AUTH_RECOVERY_EMAIL_API = getEnvVar('AUTH_RECOVERY_EMAIL_API');
export const AUTH_SECRET = getEnvVar('AUTH_SECRET');

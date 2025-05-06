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

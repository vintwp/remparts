import slugify from 'slugify';
import { paginate, cursorPaginate } from './pagination';
import { ConfigService } from '@nestjs/config';

function createUrl(name: string): string {
  const options = {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@/|\/]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'uk', // language code of the locale to use
    trim: true,
  };

  const slug = slugify(name, options);

  return slug;
}

function removeObjectProperty<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keysToDelete: K[],
): { [P in Exclude<keyof T, K>]: T[P] } {
  const res = {} as T;

  for (const prop in obj) {
    const key = prop as keyof T;

    if (!keysToDelete.includes(key as K)) {
      res[prop] = obj[prop];
    }
  }

  return res;
}

const isDev = (configService: ConfigService) => {
  return configService.getOrThrow('NODE_ENV') === 'development';
};

function compareObjectsByKeys<T, P extends keyof T>(
  obj1: T,
  obj2: Pick<T, P>,
  keysToCompare: P[],
): boolean {
  let isSame = true;

  for (const key of keysToCompare) {
    if (obj1[key] !== obj2[key]) {
      isSame = false;
      break;
    }
  }

  return isSame;
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export {
  createUrl,
  paginate,
  cursorPaginate,
  removeObjectProperty,
  compareObjectsByKeys,
  isDev,
  chunkArray,
};

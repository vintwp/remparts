import slugify from 'slugify';
import { paginate, cursorPaginate } from './pagination';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
  referenceObject: T,
  comparedObject: Pick<Partial<T>, P>,
  keysToCompare: P[],
): boolean {
  return keysToCompare.every(key => referenceObject[key] === comparedObject[key]);
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function compareArrayOfObjectsByKeys<T, P, K extends keyof T & keyof P, V extends T[K] & P[K]>(
  referenceObjects: T[],
  comparedObjects: P[],
  keysToCompare: K[],
  primaryKey: K,
): {
  notEqualObjects: P[];
  missedInReferenceObjects: P[];
  missedInComparedObjects: T[];
} {
  // start check from array with bigger length
  const referenceObjectsMapped = new Map(referenceObjects.map(item => [item[primaryKey], item]));
  const comparedObjectsMapped = new Map(comparedObjects.map(item => [item[primaryKey], item]));

  const uniquePrimaryKeys = new Set([
    ...(referenceObjectsMapped.keys() as IterableIterator<V>),
    ...(comparedObjectsMapped.keys() as IterableIterator<V>),
  ]);

  const notEqualObjects = [];
  const missedInReferenceObjects = [];
  const missedInComparedObjects = [];

  for (const key of uniquePrimaryKeys) {
    const referenceObject = referenceObjectsMapped.get(key);
    const comparedObject = comparedObjectsMapped.get(key);

    if (referenceObject && comparedObject) {
      const isObjectsEqual = keysToCompare.every(key => {
        const refValue = referenceObject[key] as V;
        const compValue = comparedObject[key] as V;

        if (Array.isArray(refValue) && Array.isArray(compValue)) {
          return JSON.stringify(refValue) === JSON.stringify(compValue);
        }

        return refValue === compValue;
      });

      if (!isObjectsEqual) notEqualObjects.push(comparedObject);
    } else if (referenceObject && !comparedObject) {
      missedInComparedObjects.push(referenceObject);
    } else if (!referenceObject && comparedObject) {
      missedInReferenceObjects.push(comparedObject);
    }
  }

  return {
    notEqualObjects,
    missedInReferenceObjects,
    missedInComparedObjects,
  };
}

function parseDate(date: string) {
  const parsedDate = dayjs(date, 'DD.MM.YY');

  if (!parsedDate.isValid()) throw new Error(`Invalid date: ${date}`);

  return parsedDate.toDate();
}

export {
  createUrl,
  paginate,
  cursorPaginate,
  removeObjectProperty,
  compareObjectsByKeys,
  isDev,
  chunkArray,
  parseDate,
  compareArrayOfObjectsByKeys,
};

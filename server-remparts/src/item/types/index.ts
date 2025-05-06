import { Item } from '@prisma/client';

const sortParams = {
  'name-desc': 'name-desc',
  'price-desc': 'price-desc',
  'price-asc': 'price-asc',
  'name-asc': 'name-asc',
} as const;

export type Sort = {
  [key in keyof typeof sortParams]: {
    sortField: keyof Item;
    type: 'asc' | 'desc';
  };
};

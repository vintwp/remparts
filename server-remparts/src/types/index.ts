import { Item } from '@prisma/client';

type TPagination = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: any;
  nextPage: number;
  pageCount: number;
  totalCount: number;
};

type TItem = Pick<Item, 'id' | 'name'> & {
  brand: {
    name: string;
  };
};

export type { TPagination, TItem };

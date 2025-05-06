import { Category, Item, Pagination } from '@/shared/types';

type TSearch = {
  items: Item[];
  pagination: Pagination;
  categories: Pick<Category, 'id' | 'name'>[];
};

export type { TSearch };

import { fetch } from '@/shared/api';
import { CATEGORY_API } from '@/shared/config';
import { Brand, Category, Item, Pagination, RefineFields, Department } from '@/shared/types';

const getCategories = async () => {
  const data = await fetch.getData<Array<Category & { department: Department }>>(
    `${CATEGORY_API}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return data;
};

export type CategoryExtened = Category & {
  department: {
    id: number;
    name: string;
    url: string;
    order: number;
  };
  brand: Brand[];
  quality: RefineFields[];
  complianceWith: RefineFields[];
};

type CategoryByUrl = {
  category: CategoryExtened;
  itemsByCategory: {
    items: Item[];
    pagination: Pagination;
  };
};

const getCategoryByUrl = async (url: string, searchParams?: string) => {
  const data = await fetch.getData<CategoryByUrl>(
    `${CATEGORY_API}/${url}${searchParams ? `?${searchParams}` : ''}`,
    {
      cache: 'force-cache',
    },
  );

  return data;
};

export { getCategories, getCategoryByUrl };

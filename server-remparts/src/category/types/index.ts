import { Brand, Category, Department, Item, Quality } from '@prisma/client';
import { ItemWithImageLinks, TPagination } from 'src/types';

type TResponseCategoryByUrl = {
  category: Category & {
    department: Department;
    brand: Brand[];
    quality: Quality[];
    complianceWith: Quality[];
  };

  itemsByCategory: {
    items: Array<ItemWithImageLinks>;
    pagination: TPagination;
  };
};

export type { TResponseCategoryByUrl };

import { Brand, Category, Department, Item, Quality } from '@prisma/client';
import { TPagination } from 'src/types';

type TResponseCategoryByUrl = {
  category: Category & {
    department: Department;
    brand: Brand[];
    quality: Quality[];
    complianceWith: Quality[];
  };

  itemsByCategory: {
    items: Array<Item & { images: Array<{ link: string }> }>;
    pagination: TPagination;
  };
};

export type { TResponseCategoryByUrl };

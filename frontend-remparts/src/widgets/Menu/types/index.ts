import { Category, Department } from '@/shared/types';

type Menu = Department & {
  category: Category[];
};

export type { Menu };

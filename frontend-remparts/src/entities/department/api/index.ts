import { fetch } from '@/shared/api';
import { DEPARTMENT_API } from '@/shared/config';
import { Department } from '@/shared/types';

const getDepartments = async <T = undefined>(withCategories: boolean = false) => {
  const params = withCategories ? '?category=true' : '';

  const data = await fetch.getData<T extends undefined ? Department[] : T>(
    `${DEPARTMENT_API}${params}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return data;
};

const getDepartmentByUrl = async <T = undefined>(url: string, withCategories: boolean = false) => {
  const params = withCategories ? '?category=true' : '';

  const data = await fetch.getData<T extends undefined ? Department : T>(
    `${DEPARTMENT_API}/${url}${params}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return data;
};

export { getDepartments, getDepartmentByUrl };

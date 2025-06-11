import { getDepartments } from '@/entities/department';

import { Menu } from '../../types';

import { LargeMenu } from './LargeMenu';
import { MobileMenu } from './MobileMenu';

export async function CatalogMenu() {
  const departments = await getDepartments<Menu[]>(true);

  return (
    <>
      <div className="block md:hidden">
        <MobileMenu departments={departments.ok ? departments.data : []} />
      </div>
      <div className="hidden md:block">
        <LargeMenu departments={departments.ok ? departments.data : []} />
      </div>
    </>
  );
}

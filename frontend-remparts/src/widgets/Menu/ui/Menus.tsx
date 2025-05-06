import { getDepartments } from '@/entities/department';
import { Menu } from '../types';
import { MenuMobile } from './MenuMobile';
import { MenuLarge } from './MenuLarge';

export async function Menus() {
  const departments = await getDepartments<Menu[]>(true);

  return (
    <>
      <MenuMobile
        departments={departments.ok ? departments.data : []}
        className="block md:hidden"
      />
      <MenuLarge
        departments={departments.ok ? departments.data : []}
        className="hidden md:block"
      />
    </>
  );
}

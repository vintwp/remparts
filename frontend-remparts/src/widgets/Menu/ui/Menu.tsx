import { Suspense } from 'react';
import { MenuItemSkeleton } from './MenuItemSkeleton';
import { Menus } from './Menus';

export async function Menu() {
  return (
    <Suspense fallback={<MenuItemSkeleton />}>
      <Menus />
    </Suspense>
  );
}

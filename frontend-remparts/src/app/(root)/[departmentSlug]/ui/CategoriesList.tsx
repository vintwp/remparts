import Link from 'next/link';

import { SidebarCollapsible, SidebarCollapsibleItem } from '@/shared/component';
import { Category, Department } from '@/shared/types';

type Props = {
  department: Department & { category: Category[] };
};

export function CategoriesList({ department }: Props) {
  return (
    <SidebarCollapsible title="Категорії">
      {department.category.map(cat => (
        <SidebarCollapsibleItem key={`${department.url}-${cat.name}`}>
          <Link href={`/${department.url}/${cat.url}`}>{cat.name}</Link>
        </SidebarCollapsibleItem>
      ))}
    </SidebarCollapsible>
  );
}

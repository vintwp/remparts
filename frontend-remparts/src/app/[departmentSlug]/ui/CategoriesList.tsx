import { Category, Department } from '@/shared/types';
import { SidebarCollapsible, SidebarCollapsibleItem } from '@/shared/component';
import Link from 'next/link';

type Props = {
  department: Department & { category: Category[] };
};

export function CategoriesList({ department }: Props) {
  return (
    <SidebarCollapsible title="Категорії">
      {department.category.map(cat => (
        <SidebarCollapsibleItem key={`${department.url}-${cat.name}`}>
          <Link href={`/${department.url}-${department.id}/${cat.url}-${cat.id}`}>{cat.name}</Link>
        </SidebarCollapsibleItem>
      ))}
    </SidebarCollapsible>
  );
}

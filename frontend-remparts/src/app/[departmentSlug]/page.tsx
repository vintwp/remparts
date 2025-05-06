import { notFound } from 'next/navigation';
import { getDepartmentByUrl } from '@/entities/department';
import { CategoryCard } from '@/entities/category';
import { type Category, type Department } from '@/shared/types';
import { Breadcrumbs, CategoriesList } from './ui';

type Params = {
  params: Promise<{ categorySlug: string; departmentSlug: string }>;
};

export default async function Page({ params }: Params) {
  const { departmentSlug } = await params;

  const department = await getDepartmentByUrl<Department & { category: Category[] }>(
    departmentSlug,
    true,
  );

  if (!department.ok) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs departmentName={department.data.name} />
      <h1 className="my-3 text-3xl font-bold">{department.data.name}</h1>
      <div className="flex gap-2">
        <div className="bg-additional/10 hidden h-max shrink-0 grow-0 basis-0 rounded-sm md:block md:basis-1/3">
          <CategoriesList department={department.data} />
        </div>
        <div className="basis-full md:basis-2/3">
          <div className="flex w-full flex-wrap gap-y-4">
            {department.data.category.map(category => (
              <CategoryCard
                key={`category-${category.name}`}
                category={category}
                departmentUrl={department.data.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

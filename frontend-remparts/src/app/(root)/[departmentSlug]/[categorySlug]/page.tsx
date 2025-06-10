import { notFound } from 'next/navigation';

import { getCategoryByUrl } from '@/entities/category';
import { getCategories } from '@/entities/category';

import { auth } from '@/shared/config/auth';
import { createURLSearchParams } from '@/shared/lib/utils';

import { Breadcrumbs } from './ui/Breadcrumbs';
import { ControlPanel } from './ui/ControlPanel';
import { ItemsList } from './ui/ItemsList';
import { RefineSearch } from './ui/RefineSearch';
import { Pagination } from '@/features';

type Props = {
  params: Promise<{ categorySlug: string; departmentSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();

  if (!categories.ok) {
    return [
      {
        categorySlug: '',
        departmentSlug: '',
      },
    ];
  }

  return categories.data.map(category => ({
    categorySlug: category.url,
    departmentSlug: category.department.url,
  }));
}

export default async function Page({ params, searchParams }: Props) {
  const authorized = await auth();
  const { categorySlug } = await params;
  const searchParamsAsync = await searchParams;
  const currentPage = searchParamsAsync.page as string;

  const searchParamsForRequest = Object.keys(searchParamsAsync)
    .map(key => {
      return createURLSearchParams(key, searchParamsAsync[key]);
    })
    .join('&');

  const categoryExtendedData = await getCategoryByUrl(categorySlug, searchParamsForRequest, {
    headers: {
      Authorization: `Bearer ${authorized?.access_token}`,
    },
  });

  if (!categoryExtendedData.ok) {
    notFound();
  }

  const { category, itemsByCategory } = categoryExtendedData.data;

  return (
    <>
      <Breadcrumbs
        department={category.department}
        categoryName={category.name}
      />
      <h1 className="my-3 text-3xl font-bold">{category.name}</h1>
      <div className="flex gap-2">
        <RefineSearch
          brand={category.brand}
          quality={category.quality}
          complianceWith={category.complianceWith}
        />
        <div className="basis-full md:basis-2/3">
          <div className="mb-2">
            <ControlPanel category={category} />
          </div>

          <ItemsList items={itemsByCategory.items} />
          <div className="mt-5 md:mt-10">
            <Pagination
              currentPage={+currentPage || 1}
              lastPage={itemsByCategory.pagination.lastPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

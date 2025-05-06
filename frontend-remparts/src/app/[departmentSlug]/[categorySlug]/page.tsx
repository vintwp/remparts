import { getCategoryByUrl } from '@/entities/category';
import { Breadcrumbs } from './ui/Breadcrumbs';
import { getCategories } from '@/entities/category';
import { notFound } from 'next/navigation';
import { FilterBy, Pagination } from '@/features';
import { createURLSearchParams } from '@/shared/lib/utils';
import { ItemsList } from './ui/ItemsList';
import { Separator } from '@/shared/ui';
import { ControlPanel } from './ui/ControlPanel';

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
  const { categorySlug } = await params;
  const searchParamsAsync = await searchParams;
  const currentPage = searchParamsAsync.page as string;

  const searchParamsForRequest = Object.keys(searchParamsAsync)
    .map(key => {
      return createURLSearchParams(key, searchParamsAsync[key]);
    })
    .join('&');

  const categoryExtendedData = await getCategoryByUrl(categorySlug, searchParamsForRequest);

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
        <div
          className="sticky top-1 hidden h-max shrink-0 grow-0 basis-0 space-y-4 rounded-sm bg-neutral-50 py-3 md:block
            md:basis-1/3"
        >
          <FilterBy
            showCommand
            title="Бренд"
            searchParameter="brand"
            filterProperties={category.brand}
          />
          <div className="px-4">
            <Separator />
          </div>
          {category.quality.length ? (
            <>
              <FilterBy
                title="Якість"
                searchParameter="quality"
                filterProperties={category.quality}
              />
            </>
          ) : null}
          {category.complianceWith.length ? (
            <>
              <FilterBy
                title="Сумісно з"
                searchParameter="complianceWith"
                filterProperties={category.complianceWith}
              />
            </>
          ) : null}
        </div>
        <div className="basis-full md:basis-2/3">
          <ControlPanel category={category} />

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

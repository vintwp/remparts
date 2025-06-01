import { FilterBy, Pagination } from '@/features';
import { Breadcrumbs } from './ui/Breadcrumbs';
import { Container } from '@/shared/ui';
import { getSearch } from '@/features/Search';
import { notFound } from 'next/navigation';
import { ItemsList } from '@/widgets/ItemsList';
import { ControlPanel } from './ui/ControlPanel';
import { createURLSearchParams } from '@/shared/lib/utils';

type Props = {
  searchParams: Promise<{ query: string; [key: string]: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const searchParamsAsync = await searchParams;

  const searchParamsForRequest = Object.keys(searchParamsAsync)
    .map(key => {
      if (key === 'query') {
        return '';
      }
      return createURLSearchParams(key, searchParamsAsync[key]);
    })
    .join('&');

  if (!searchParamsAsync.query) {
    notFound();
  }

  const searchResult = await getSearch(searchParamsAsync.query, searchParamsForRequest);

  return (
    <Container className="pt-2 pb-5 md:pt-5 md:pb-10">
      <Breadcrumbs />
      <h1 className="my-3 text-3xl font-bold">Результати пошуку</h1>
      <div className="flex gap-2">
        <div
          className="sticky top-1 hidden h-max shrink-0 grow-0 basis-0 space-y-4 rounded-sm bg-neutral-50 py-3 md:block
            md:basis-1/3"
        >
          <FilterBy
            title="Категорія"
            variant="single"
            raiseUpChecked={false}
            searchParameter="category"
            filterProperties={searchResult.ok ? searchResult.data.categories : []}
          />
        </div>
        <div className="basis-full overflow-hidden md:basis-2/3">
          <div className="mb-2">
            <ControlPanel />
          </div>

          <ItemsList items={searchResult.ok ? searchResult.data.items : []} />

          <div className="mt-5 md:mt-10">
            <Pagination
              currentPage={searchResult.ok ? searchResult.data.pagination.currentPage : 1}
              lastPage={searchResult.ok ? searchResult.data.pagination.lastPage : 1}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

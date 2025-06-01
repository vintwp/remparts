import { CategoryExtened } from '@/entities/category';
import { ShowStock } from '@/features';
import { PerPage } from '@/features';
import { SortBy } from '@/features/';
import { SidebarFilter } from '@/widgets/SidebarFilter';

type Props = {
  category: CategoryExtened;
};

export function ControlPanel({ category }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-sm bg-neutral-50 p-2">
      <div className="flex basis-3/5 justify-start md:basis-2/5">
        <SortBy />
      </div>
      <div className="flex basis-1/5 justify-center md:basis-1/5">
        <ShowStock />
      </div>
      <div className="hidden basis-1/5 justify-end md:flex md:basis-2/5">
        <PerPage />
      </div>
      <div className="flex basis-1/5 md:hidden">
        <SidebarFilter categoryOptions={category} />
      </div>
    </div>
  );
}

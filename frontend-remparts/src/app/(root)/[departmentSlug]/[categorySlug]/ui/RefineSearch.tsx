import { Brand, RefineFields } from '@/shared/types';
import { Separator } from '@/shared/ui';

import { FilterBy } from '@/features';

type Props = { brand: Brand[]; quality: RefineFields[]; complianceWith: RefineFields[] };

export function RefineSearch({ brand, quality, complianceWith }: Props) {
  return (
    <div
      className="sticky top-1 hidden h-max shrink-0 grow-0 basis-0 space-y-4 rounded-sm bg-neutral-50 py-3 md:block
        md:basis-1/3"
    >
      <FilterBy
        showCommand
        title="Бренд"
        searchParameter="brand"
        filterProperties={brand}
      />
      <div className="px-4">
        <Separator />
      </div>
      {quality.length ? (
        <>
          <FilterBy
            title="Якість"
            searchParameter="quality"
            filterProperties={quality}
          />
        </>
      ) : null}
      {complianceWith.length ? (
        <>
          <FilterBy
            title="Сумісно з"
            searchParameter="complianceWith"
            filterProperties={complianceWith}
          />
        </>
      ) : null}
    </div>
  );
}

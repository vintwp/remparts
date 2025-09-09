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
      {brand.length > 1 && (
        <>
          <FilterBy
            showCommand
            title="Бренд"
            searchParameter="brand"
            filterProperties={brand}
          />
          <div className="px-4">
            <Separator />
          </div>
        </>
      )}

      {quality.length > 1 && (
        <>
          <FilterBy
            title="Якість"
            searchParameter="quality"
            filterProperties={quality}
          />
          <div className="px-4">
            <Separator />
          </div>
        </>
      )}
      {complianceWith.length > 1 && (
        <>
          <FilterBy
            title="Сумісно з"
            searchParameter="compliance"
            filterProperties={complianceWith}
          />
        </>
      )}
    </div>
  );
}

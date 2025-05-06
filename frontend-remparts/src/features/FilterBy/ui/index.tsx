'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilterInput } from './FilterInput';
import { FilterValueCheck } from './FilterValueCheck';
import { startHolyLoader } from 'holy-loader';
import { useCustomSearchParams } from '@/shared/hooks';
import { ScrollArea } from '@/shared/ui';
import { FilterParams } from '../types';
import { cn } from '@/shared/lib/utils';

type Props<T> = {
  title: string;
  searchParameter: string;
  variant?: 'single' | 'multiple';
  raiseUpChecked?: boolean;
  filterProperties?: T[];
  showCommand?: boolean;
  scrollAreaClassName?: string;
};

export function FilterBy<T extends FilterParams>({
  title,
  searchParameter,
  variant = 'multiple',
  raiseUpChecked = true,
  filterProperties = [],
  showCommand = false,
  scrollAreaClassName,
}: Props<T>) {
  const { paramValues, createPath } = useCustomSearchParams(searchParameter);
  const [itemsToRender, setItemsToRender] = useState<T[]>([]);
  const router = useRouter();

  const handleInput = (value: string) => {
    const filtered = filterProperties?.filter(itemFilter => {
      const valueFilter = (itemFilter.name || itemFilter.value)?.toLowerCase();
      const lowerCaseQuery = value.toLowerCase();

      return valueFilter?.includes(lowerCaseQuery);
    });

    setItemsToRender(filtered || []);
  };

  const isChecked = (id: number) => {
    return paramValues.findIndex(v => +v === id) !== -1;
  };

  const handleCheck = (id: number) => {
    if (variant === 'single') {
      const paramsToAdd = paramValues.includes(id.toString()) ? [] : [id];

      const path = createPath(paramsToAdd, true);

      router.replace(path);
      startHolyLoader();

      return;
    }

    const selectedFilterValues = paramValues.map(v => +v);

    const paramsToAdd = selectedFilterValues.includes(id)
      ? [...selectedFilterValues].filter(v => v !== id)
      : [...selectedFilterValues, id];

    const path = createPath(paramsToAdd, true);

    router.replace(path);
    startHolyLoader();
  };

  const renderList = () => (
    <ul className="space-y-4 py-2 font-light">
      {[...itemsToRender]
        .sort((a, b) => (a.name || a.value || '').localeCompare(b.name || b.value || ''))
        .sort((a, b) => {
          if (!raiseUpChecked) {
            return 0;
          }

          return Number(isChecked(b.id)) - Number(isChecked(a.id));
        })
        .map(itemFilter => (
          <li key={`filter-title-${itemFilter.name || itemFilter.value}`}>
            <FilterValueCheck
              id={itemFilter.id}
              value={itemFilter.name || itemFilter.value || ''}
              checked={isChecked(itemFilter.id)}
              onCheck={handleCheck}
            />
          </li>
        ))}
    </ul>
  );

  useEffect(() => {
    setItemsToRender(filterProperties || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3 px-3">
      <h4 className="text text-xl font-semibold">{title}</h4>
      {showCommand && <FilterInput onChange={handleInput} />}

      {itemsToRender.length > 10 ? (
        <ScrollArea className={cn('h-72 w-full md:h-96', scrollAreaClassName)}>
          {renderList()}
        </ScrollArea>
      ) : (
        renderList()
      )}
    </div>
  );
}

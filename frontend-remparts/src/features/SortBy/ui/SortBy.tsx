'use client';

import { useRouter } from 'next/navigation';
import { type TSelectDropdownOption, SelectDropdown } from '@/shared/ui';
import { useCustomSearchParams } from '@/shared/hooks';
import { startHolyLoader } from 'holy-loader';

const sortByOptions: TSelectDropdownOption[] = [
  {
    value: '',
    label: 'Назва (А - Я)',
  },
  {
    value: 'name-desc',
    label: 'Назва (Я - A)',
  },
  {
    value: 'price-asc',
    label: 'Ціна (низька - висока)',
  },
  {
    value: 'price-desc',
    label: 'Ціна (висока - низька)',
  },
];

export function SortBy() {
  const SEARCH_PARAMETER = 'sortBy';
  const router = useRouter();
  const { paramValues, createPath } = useCustomSearchParams(SEARCH_PARAMETER);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = createPath(e.target.value, true);
    router.replace(path);

    startHolyLoader();
  };

  return (
    <SelectDropdown
      options={sortByOptions}
      defaultValue={paramValues[0] || sortByOptions[0].value}
      label="Сортування"
      onChange={handleChange}
      className="[&>select]:w-full [&>select]:max-w-[190px] [&>select]:min-w-[70px]"
    />
  );
}

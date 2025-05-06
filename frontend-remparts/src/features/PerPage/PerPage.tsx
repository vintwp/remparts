'use client';

import { useRouter } from 'next/navigation';
import { startHolyLoader } from 'holy-loader';
import { useCustomSearchParams } from '@/shared/hooks';
import { TSelectDropdownOption, SelectDropdown } from '@/shared/ui';

const options: TSelectDropdownOption[] = [
  {
    value: '',
    label: '20',
  },
  {
    value: '40',
    label: '40',
  },
  {
    value: '60',
    label: '60',
  },
  {
    value: '80',
    label: '80',
  },
];

export function PerPage() {
  const SEARCH_PARAMETER = 'perPage';
  const router = useRouter();
  const { paramValues, createPath } = useCustomSearchParams(SEARCH_PARAMETER);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = createPath(e.target.value, true);

    router.replace(path);

    startHolyLoader();
  };

  return (
    <SelectDropdown
      options={options}
      defaultValue={paramValues[0]}
      label="Товарів на сторінці"
      onChange={handleChange}
    />
  );
}

'use client';

import { Checkbox } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { startHolyLoader } from 'holy-loader';
import { useCustomSearchParams } from '@/shared/hooks';

export function ShowStock() {
  const SEARCH_PARAMETER = 'stock';

  const router = useRouter();

  const { paramValues, createPath } = useCustomSearchParams(SEARCH_PARAMETER);

  const handleCheck = (state: boolean) => {
    const path = createPath(state, true);

    router.replace(path);
    startHolyLoader();
  };

  return (
    <div className="hover:text-primary-alt flex w-full items-center space-x-2">
      <Checkbox
        id="stock"
        className="data-[state=checked]:bg-primary-alt cursor-pointer"
        onCheckedChange={handleCheck}
        defaultChecked={paramValues[0] === 'true'}
      />
      <label
        htmlFor="stock"
        className="cursor-pointer truncate text-base leading-none peer-disabled:cursor-not-allowed
          peer-disabled:opacity-70"
      >
        Наявність
      </label>
    </div>
  );
}

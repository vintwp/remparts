import { Skeleton } from '@/shared/ui';
import { MenuItem } from './MenuItem';

export function MenuItemSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <MenuItem
          key={idx}
          className="border-gray flex items-center justify-between gap-1 border-[1px] py-3 pr-6 pl-4"
        >
          <Skeleton className="h-8 w-full rounded-xl" />
        </MenuItem>
      ))}
    </>
  );
}

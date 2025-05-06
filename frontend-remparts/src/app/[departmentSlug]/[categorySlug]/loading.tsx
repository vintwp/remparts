import { Skeleton } from '@/shared/ui';

export default function Loading() {
  return (
    <div className="pt-8">
      <Skeleton className="h-[40px] w-[320px] rounded-sm" />
      <div className="mt-3 flex gap-2">
        <div className="hidden space-y-3 bg-neutral-50 py-3 md:block md:basis-1/3">
          <Skeleton className="mx-3 h-[30px] w-[100px] rounded-sm" />
          <div className="w-full space-y-3 px-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={`cat-page-filter-skeleton-${idx}`}
                className="h-[30px] w-full rounded-sm"
              />
            ))}
          </div>
        </div>
        <div className="basis-full md:basis-2/3">
          <div className="flex h-[45px] w-full items-center justify-between bg-neutral-50 px-2">
            <Skeleton className="h-[35px] w-1/6 rounded-sm" />
            <Skeleton className="h-[35px] w-1/6 rounded-sm" />
            <Skeleton className="h-[35px] w-1/6 rounded-sm" />
          </div>
          <div className="mt-3 space-y-3">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={`cat-page-filter-item-${idx}`}
                className="border-additional/50 rounded-sm border-[1px]"
              >
                <Skeleton className="h-[150px] w-full rounded-sm md:h-[90px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

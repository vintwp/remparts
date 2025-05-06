import { Skeleton } from '@/shared/ui';

export default function Loading() {
  return (
    <>
      <Skeleton className="mt-10 h-[60px] w-10/12 md:h-[35px] md:w-[350px]" />
      <div className="mt-4 flex gap-2">
        <div className="bg-additional/10 hidden h-max shrink-0 grow-0 basis-0 space-y-3 rounded-sm p-3 md:block md:basis-1/3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={`dep-page-filter-cats-${idx}`}
              className="h-[40px] w-10/12 bg-black/5"
            />
          ))}
        </div>
        <div className="basis-full md:basis-2/3">
          <div className="flex w-full flex-wrap gap-y-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={`dep-page-cats-${idx}`}
                className="group relative shrink-0 grow-0 basis-1/2 px-1 md:basis-1/3 lg:basis-1/4"
              >
                <div className="flex h-[100px] w-full items-center justify-center overflow-hidden bg-gray-50 md:h-[150px]">
                  <div className="relative h-[calc(100%-16px)] w-[calc(100%-16px)]" />
                </div>
                <Skeleton className="mt-3 h-[20px] w-10/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

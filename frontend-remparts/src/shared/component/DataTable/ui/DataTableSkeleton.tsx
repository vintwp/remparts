import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui';

function DataTableSkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-4', className)}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-6 w-full"
        />
      ))}
    </div>
  );
}

export function DataTableSkeleton() {
  return (
    <>
      <div className="mb-2 border-b-[1px] border-slate-500 py-2">
        <DataTableSkeletonRow />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border-slate-200 py-1 not-last:border-b-[1px]"
          >
            <DataTableSkeletonRow />
          </div>
        ))}
      </div>
    </>
  );
}

import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function MenuItem({ className, children }: Props) {
  return (
    <button className={cn('flex items-center justify-between gap-1 py-3 pr-6 pl-4', className)}>
      {children}
    </button>
  );
}

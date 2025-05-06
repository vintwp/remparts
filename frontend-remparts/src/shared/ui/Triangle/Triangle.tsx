import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

export function Triangle({ className }: Props) {
  return (
    <div
      className={cn(
        `border-l-additional/80 h-0 w-0 border-0 border-t-[5px] border-b-[5px] border-l-[9px]
        border-t-transparent border-b-transparent transition duration-300`,
        className,
      )}
    />
  );
}

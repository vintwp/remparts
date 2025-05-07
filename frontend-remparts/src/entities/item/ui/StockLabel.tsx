import { cn } from '@/shared/lib/utils';
import { Check, X } from 'lucide-react';

type Props = {
  stock: number;
};

export function StockLabel({ stock }: Props) {
  return (
    <div className="flex items-center gap-1 text-[10px]">
      <span
        className={cn(
          'flex h-[12px] w-[12px] items-center justify-center rounded-full',
          stock && 'bg-green-700',
          !stock && 'bg-red-700',
        )}
      >
        {stock ? (
          <Check
            size={10}
            stroke="white"
          />
        ) : (
          <X
            size={10}
            stroke="white"
          />
        )}
      </span>

      <span className="text-[12px] text-black/50">
        {stock ? 'В наявності' : 'Немає в наявності'}
      </span>
    </div>
  );
}

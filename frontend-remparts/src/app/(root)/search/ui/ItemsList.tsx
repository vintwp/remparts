import { ProductCard } from '@/widgets/ProductCard';

import { cn } from '@/shared/lib/utils';
import { Item as IItem } from '@/shared/types';

type Props = {
  items: IItem[];
  className?: string;
};

export function ItemsList({ items, className }: Props) {
  return (
    <div className={cn('grid gap-4', className)}>
      {items.length ? (
        items.map(item => (
          <ProductCard
            key={`${item.id}-${item.name}`}
            item={item}
          />
        ))
      ) : (
        <p className="py-2 text-center text-3xl font-semibold">
          Товарів за вашим запитом не знайдено :({' '}
        </p>
      )}
    </div>
  );
}

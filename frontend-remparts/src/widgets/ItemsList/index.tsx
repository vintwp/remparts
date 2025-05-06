import { Item } from '@/entities/item';
import { cn } from '@/shared/lib/utils';
import { Item as TItem } from '@/shared/types';

type Props = {
  items: TItem[];
  className?: string;
};

export function ItemsList({ items, className }: Props) {
  return (
    <div className={cn('grid gap-4', className)}>
      {items.length ? (
        items.map(item => (
          <div
            key={`item-${item.id}`}
            className=""
          >
            <Item item={item} />
          </div>
        ))
      ) : (
        <p className="py-2 text-center text-3xl font-semibold">
          Товарів за вашим запитом не знайдено :({' '}
        </p>
      )}
    </div>
  );
}

import { AddToCart } from '@/features/AddToCart';

import { Item as IItem } from '@/shared/types';

type Props = {
  item: IItem;
};

export function ProductAddToCart({ item }: Props) {
  return (
    <AddToCart
      itemId={item.id}
      isStock={item.stock > 0}
    />
  );
}

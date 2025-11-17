import { useDebouncedCallback } from 'use-debounce';

import { type CartItem } from '@/entities/cart';

import { NumberInput } from '@/shared/component';
import { cn } from '@/shared/lib/utils';

import { CartItemButtonDelete } from './CartItemButtonDelete';
import { CartItemImage } from './CartItemImage';
import { CartItemInfo } from './CartItemInfo';
import { CartItemPrice } from './CartItemPrice';

type Props = {
  item: CartItem;
  onDelete: (id: number) => void;
  onChangeQty: (id: number, itemQty: number) => void;
};

export function CartItem({ item, onDelete, onChangeQty }: Props) {
  const handleChangeQty = useDebouncedCallback((qty: number) => {
    onChangeQty(item.id, qty);
  }, 200);

  return (
    <div
      className={cn(
        `flex h-full flex-wrap items-center gap-3 bg-neutral-50 px-2 py-1 hover:bg-neutral-100 md:flex-nowrap
        md:gap-1`,
      )}
    >
      <div className="flex basis-full items-center gap-1.5 md:basis-9/12">
        <CartItemButtonDelete onClick={() => onDelete(item.id)} />

        <CartItemImage
          img={item.images[0]}
          name={item.name}
        />

        <CartItemInfo
          id={item.id}
          name={item.name}
        />
      </div>
      <div className="flex basis-full items-center justify-between md:basis-3/12 md:gap-2">
        <NumberInput
          onChange={handleChangeQty}
          defaultValue={item.itemQty}
          className="[&_input]:bg-white"
        />
        <CartItemPrice
          price={item.price}
          itemQty={item.itemQty}
        />
      </div>
    </div>
  );
}

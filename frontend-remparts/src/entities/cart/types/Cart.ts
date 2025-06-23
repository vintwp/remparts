import { Item } from '@/shared/types';

type ItemCart = Pick<Item, 'id' | 'name' | 'price' | 'images'> & { itemQty: number };

type Cart = {
  items: ItemCart[];
  totalSum: number;
};

export { type Cart, type ItemCart };

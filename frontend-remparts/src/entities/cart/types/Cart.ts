import { Item } from '@/shared/types';

type CartItem = Pick<Item, 'id' | 'name' | 'price' | 'images'> & { itemQty: number };

type Cart = {
  items: CartItem[];
  totalSum: number;
};

export type { Cart, CartItem };

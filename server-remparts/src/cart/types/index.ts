import { Item, ItemImage } from '@prisma/client';

export type TItemCart = Pick<Item, 'id' | 'name' | 'price'> & {
  itemQty: number;
  images?: ItemImage[];
};

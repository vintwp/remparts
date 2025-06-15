import { ItemWithImageLinks } from 'src/types';

export type TItemCart = Pick<ItemWithImageLinks, 'id' | 'name' | 'price'> & {
  itemQty: number;
  images?: string[];
};

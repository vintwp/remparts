import { ItemWithImageLinks } from 'src/shared/types/';

export type TItemCart = Pick<ItemWithImageLinks, 'id' | 'name' | 'price'> & {
  itemQty: number;
  images?: string[];
};

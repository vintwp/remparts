import { Item } from '@prisma/client';

type TItem = Pick<Item, 'id' | 'name'> & {
  brand: {
    name: string;
  };
};

type ItemWithImageObjects = Item & { images: { link: string }[] };
type ItemWithImageLinks = Item & { images?: string[] };

type TItemReturn = Omit<
  ItemWithImageLinks,
  'priceWholesaleBasic' | 'priceWholesaleStandard' | 'priceWholesaleTop'
>;

export { type TItem, type ItemWithImageObjects, type ItemWithImageLinks, type TItemReturn };

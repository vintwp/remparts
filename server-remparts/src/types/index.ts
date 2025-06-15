import { Item, CustomerPriceTier, User, ItemImage } from '@prisma/client';

type TPagination = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: any;
  nextPage: number;
  pageCount: number;
  totalCount: number;
};

type PriceTierToProductParam = {
  [key in CustomerPriceTier]: keyof Pick<
    Item,
    'priceWholesaleBasic' | 'priceWholesaleStandard' | 'priceWholesaleTop' | 'price'
  >;
};

const priceTierToProductParam: PriceTierToProductParam = {
  RETAIL: 'price',
  WHOLESALE_BASIC: 'priceWholesaleBasic',
  WHOLESALE_STANDARD: 'priceWholesaleStandard',
  WHOLESALE_TOP: 'priceWholesaleTop',
} as const;

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

type TJwtUser = Pick<User, 'id' | 'email' | 'role' | 'customerPriceTier'>;

export {
  type TPagination,
  type TItem,
  type TJwtUser,
  type TItemReturn,
  type ItemWithImageObjects,
  type ItemWithImageLinks,
  priceTierToProductParam,
};

import { CustomerPriceTier, Item } from '@prisma/client';

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

export { priceTierToProductParam };

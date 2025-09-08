enum CustomerPriceTier {
  RETAIL = 'RETAIL',
  WHOLESALE_BASIC = 'WHOLESALE_BASIC',
  WHOLESALE_STANDARD = 'WHOLESALE_STANDARD',
  WHOLESALE_TOP = 'WHOLESALE_TOP',
}

type ItemPrices = 'priceWholesaleBasic' | 'priceWholesaleStandard' | 'priceWholesaleTop' | 'price';

type PriceTierToProductParam = {
  [key in CustomerPriceTier]: ItemPrices;
};

const priceTierToProductParam: PriceTierToProductParam = {
  RETAIL: 'price',
  WHOLESALE_BASIC: 'priceWholesaleBasic',
  WHOLESALE_STANDARD: 'priceWholesaleStandard',
  WHOLESALE_TOP: 'priceWholesaleTop',
} as const;

export { priceTierToProductParam, CustomerPriceTier };

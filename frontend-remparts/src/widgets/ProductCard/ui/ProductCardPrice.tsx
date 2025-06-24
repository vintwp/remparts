'use client';

import { useExchangeRate } from '@/entities/exchangeRate';
import { Item } from '@/entities/item';

import { useAuth } from '@/shared/hooks';
import { Spinner } from '@/shared/ui';

type Props = {
  price: number;
};

function PriceLoader() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Spinner />
    </div>
  );
}

export function ProductCardPrice({ price }: Props) {
  const { isLoading, exchangeRate } = useExchangeRate();
  const { auth } = useAuth();

  const priceToShow = +(price * (exchangeRate || 1)).toFixed(2);

  return (
    <div className="flex h-full items-center">
      {isLoading ? (
        <PriceLoader />
      ) : (
        <div className="flex h-full flex-wrap justify-between gap-4 md:flex-col md:gap-2">
          {auth && (
            <Item.Price
              price={price}
              currency="USD"
            />
          )}
          <Item.Price
            price={priceToShow}
            currency="грн."
          />
        </div>
      )}
    </div>
  );
}

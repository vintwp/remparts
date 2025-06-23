import { useExchangeRate } from '@/entities/exchangeRate';

type Props = {
  price: number;
  itemQty: number;
};

export function CartItemPrice({ price, itemQty }: Props) {
  const { exchangeRate } = useExchangeRate();

  return (
    <div className="flex space-y-0.5 space-x-4 text-right text-sm md:flex-col md:space-x-0 md:text-base">
      <p className="leading-5">${(price * itemQty).toFixed(2)}</p>
      {exchangeRate ? (
        <p className="text-black/60">₴{(price * itemQty * exchangeRate).toFixed(2)}</p>
      ) : null}
    </div>
  );
}

'use client';

import { useState } from 'react';

import { addToCart, deleteFromCart } from '@/entities/cart';
import { mutateCart } from '@/entities/cart';
import { useCart } from '@/entities/cart/hooks/useCart';
import { useExchangeRate } from '@/entities/exchangeRate';

import { Overlay } from '@/shared/component';
import { useAuth } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import { CartEmpty } from './CartEmpty';
import { CartItem } from './CartItem';

export function Cart() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { exchangeRate } = useExchangeRate();
  const { auth } = useAuth();

  const cartFromSwr = useCart(auth?.access_token);

  if (!cartFromSwr.cart) {
    return <div className="relative flex h-full flex-col gap-4">В корзині немає товарів</div>;
  }

  const { items, totalSum } = cartFromSwr.cart;

  const onDeleteCartItem = async (id: number) => {
    setIsLoading(true);

    if (auth?.access_token) {
      await deleteFromCart([id], auth.access_token);
      await mutateCart(auth.access_token);
      setIsLoading(false);
    }
  };

  const onChangeCartItemQty = async (id: number, itemQty: number) => {
    setIsLoading(true);

    if (auth?.access_token) {
      await addToCart(id, itemQty, auth.access_token);
      await mutateCart(auth.access_token);
    }

    setIsLoading(false);
  };

  const onClearCart = async () => {
    setIsLoading(true);

    if (auth?.access_token) {
      const addedItems = items.map(itm => itm.id);

      await deleteFromCart(addedItems, auth.access_token);
      await mutateCart(auth.access_token);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {!items.length && <CartEmpty />}

      {items.length ? (
        <div className="flex h-full flex-col gap-4">
          <div className="space-y-2">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onDelete={onDeleteCartItem}
                onChangeQty={onChangeCartItemQty}
              />
            ))}
          </div>
          <Button
            variant="link"
            className="h-auto p-0 text-red-500 hover:text-red-800 md:absolute md:-top-4 md:right-0 md:-translate-y-full"
            onClick={onClearCart}
          >
            Очистити кошик
          </Button>
          <div className="sticky bottom-0 mt-auto flex items-center justify-between rounded-sm bg-neutral-50 p-2">
            <div className="flex flex-wrap gap-1">
              <div className="font-bold">Загалом:</div>
              <div className="flex flex-wrap gap-1">
                <span>${totalSum.toFixed(2)}</span>
                {exchangeRate && (
                  <span className="text-black/60">
                    {' '}
                    ( ≈ {(totalSum * exchangeRate).toFixed(2)} грн.)
                  </span>
                )}
              </div>
            </div>
            <Button className="bg-primary-alt hover:bg-primary-alt/80">Замовити</Button>
          </div>
        </div>
      ) : null}

      {isLoading && (
        <Overlay
          size="large"
          loading
          className="[&_.spinner]:text-primary-alt z-50 bg-neutral-100/50"
        />
      )}
    </div>
  );
}

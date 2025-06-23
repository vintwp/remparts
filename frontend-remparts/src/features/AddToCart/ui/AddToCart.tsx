'use client';

import { CircleCheckBig, Clock, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

import { addToCart, deleteFromCart } from '@/entities/cart';
import { useCart } from '@/entities/cart/hooks/useCart';

import { useAuth } from '@/shared/hooks';
import { Button, Spinner } from '@/shared/ui';

type Props = {
  itemId: number;
  isStock: boolean;
};

function AddIcon({ isAdded = false }: { isAdded?: boolean }) {
  if (isAdded) {
    return <CircleCheckBig />;
  }

  return <ShoppingCart />;
}

function Stock({ loading, isAdded = false }: { loading: boolean; isAdded?: boolean }) {
  return (
    <>
      {loading ? (
        <Spinner
          size="small"
          className="size-4 text-white"
        />
      ) : (
        <AddIcon isAdded={isAdded} />
      )}

      <span>{isAdded ? 'В кошику' : 'Купити'}</span>
    </>
  );
}

function OutOfStock() {
  return (
    <>
      <Clock />
      <span>Очікується</span>
    </>
  );
}

export function AddToCart({ isStock, itemId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authorization } = useAuth();
  const cartFromSwr = useCart(authorization?.access_token || '');

  const isAddedToCart = (cartFromSwr.cart?.items || []).some(item => item.id === itemId);

  const isDisabled = () => {
    if (!isStock || isLoading) {
      return true;
    }

    return false;
  };

  const handleClick = async () => {
    if (!authorization) {
      toast.error('Перед додаванням товару у кошик, Ви повинні бути авторизовані');

      return;
    }

    setIsLoading(true);

    if (isAddedToCart) {
      setIsLoading(false);

      const res = await deleteFromCart([itemId], authorization.access_token || '');

      if (!res.ok) {
        toast.error(res.message || 'Помилка при видаленні товару з кошика');
        setIsLoading(false);

        return;
      }

      await mutate('cart');
      setIsLoading(false);

      toast.success(res.message || `Товар видалено з кошика`);

      return;
    }

    const res = await addToCart(itemId, 1, authorization.access_token || '');

    if (!res.ok) {
      toast.error(res.message || 'Помилка при додаванні товару до кошика');
      setIsLoading(false);

      return;
    }

    await mutate('cart');
    setIsLoading(false);
    toast.success(res.message || `Товар додано до кошика`);
  };

  return (
    <Button
      className="bg-primary-alt hover:bg-primary-alt/80 rounded-sm md:w-full md:rounded-none"
      disabled={isDisabled()}
      onClick={handleClick}
    >
      {isStock ? (
        <Stock
          loading={isLoading}
          isAdded={isAddedToCart}
        />
      ) : (
        <OutOfStock />
      )}
    </Button>
  );
}

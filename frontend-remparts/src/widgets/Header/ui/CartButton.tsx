'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/entities/cart/hooks/useCart';

import { useAuth } from '@/shared/hooks';
import { Button } from '@/shared/ui';

export function CartButton() {
  const { auth } = useAuth();
  const { cart } = useCart(auth?.access_token || '');
  const itemsInCart = cart?.items.length || 0;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={`relative h-8 min-w-8 rounded-sm p-1 font-light text-white hover:bg-white/25 hover:text-white
        md:w-max`}
    >
      <Link
        href={'/api/account/cart'}
        className="flex gap-0"
      >
        <span>
          <ShoppingCart
            size={20}
            strokeWidth={1.75}
            className="size-5"
          />
        </span>
        {itemsInCart > 0 && (
          <span
            className="absolute top-0 right-0 flex size-3 items-center justify-center rounded-full bg-red-500 text-[10px]
              text-white"
          >
            {itemsInCart}
          </span>
        )}
      </Link>
    </Button>
  );
}

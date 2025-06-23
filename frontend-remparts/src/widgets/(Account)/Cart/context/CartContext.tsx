'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type CartContextValues = {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
};

const CartContext = createContext<CartContextValues>({} as CartContextValues);

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

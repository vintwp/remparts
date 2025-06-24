import { getCart } from '../api';
import { Cart } from '../types';

export const cartFetcher = async (accessToken: string): Promise<Cart> => {
  const res = await getCart(accessToken);

  if (!res.ok) {
    throw new Error(res.message || 'Error while getting cart');
  }

  return res.data;
};

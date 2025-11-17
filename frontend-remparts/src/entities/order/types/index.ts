import { Item } from '@/shared/types';

export type CreateOrderItem = {
  id: number;
  itemQty: number;
};

type OrderItem = {
  itemId: Item['id'];
  itemQty: number;
  itemPrice: number;
  itemName: string;
  itemAmount: number;
};

export type Order = {
  id: number;
  id1c: string;
  orderHash: string;
  userEmail: string;
  processed: boolean;
  comment: string;
  totalAmount: number;
  invoiceId: string;
  invoiceHash: string;
  createdAt: string;
  items: OrderItem[];
};

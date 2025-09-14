import { Invoice, Order, Payment, User } from '@prisma/client';

type ItemInvoice = {
  id: string;
  name: string;
  price: number;
  amountPerItem: number;
  itemQty: number;
};

type UserInvoice = {
  id: string;
  id1c: string;
  userId: number;
  totalAmount: number;
  createdAt: Date;
  item: ItemInvoice[];
  comment?: string;
};

type UserWithSettlementsAndOrder = User & {
  payment: Payment[];
  invoice: UserInvoice[];
  order: Order[];
};

export type { UserWithSettlementsAndOrder };

import { Currency, CustomerPriceTier } from '@prisma/client';

type Payment = {
  id: string;
  createdAt: Date;
  value: number;
  currency: Currency;
};

type Item = {
  id: string;
  name: string;
  qty: number;
  price: number;
  amountPerItem: number;
};

type Invoice = {
  id: string;
  createdAt: Date;
  totalAmount: number;
  items: Item[];
};

type Settlement = {
  id: number;
  id1c: string;
  name1c: string;
  customerPriceTier: CustomerPriceTier;
  balance: number;
  payments: Payment[];
  invoices: Invoice[];
};

export type { Settlement };

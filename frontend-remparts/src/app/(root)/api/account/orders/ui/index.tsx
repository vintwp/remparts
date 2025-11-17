'use client';

import { use } from 'react';

import { Order } from '@/entities/order';

import { DataTable, useDataTable } from '@/shared/component';
import { convertDate } from '@/shared/lib';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

import { columns } from '../models/Columns';

type Props = {
  ordersPromise: Promise<Order[]>;
};
export function Orders({ ordersPromise }: Props) {
  const orders = use<Order[]>(ordersPromise);

  const { table } = useDataTable(orders, columns, {
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
    },
    canBeExpanded: true,
  });

  const subTable = () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );

  return (
    <DataTable
      table={table}
      subRow={({ row }) => (
        <div className="my-2 border-[1px] px-2 py-4">
          <p className="mb-4 text-center text-xl font-semibold">
            Замовлення {row.original.id1c} від {convertDate(row.original.createdAt)}
          </p>
          <Table className="border-collapse [&_*]:border-[1px] [&_*]:border-slate-500">
            {/* <TableCaption className="border-none text-left text-black [&_*]:border-none">
              <span className="mr-2 inline-block font-medium">Коментар:</span>
              <span>{row.original.comment}</span>
            </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Код</TableHead>
                <TableHead>Товар</TableHead>
                <TableHead>Кіл-ть</TableHead>
                <TableHead>Ціна, $</TableHead>
                <TableHead className="text-right">Сума, $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.original.items.map(item => (
                <TableRow
                  key={item.itemId}
                  className="border"
                >
                  <TableCell className="w-[100px]">{item.itemId}</TableCell>
                  <TableCell className="whitespace-normal">{item.itemName}</TableCell>
                  <TableCell>{item.itemQty}</TableCell>
                  <TableCell>{item.itemPrice}</TableCell>
                  <TableCell className="text-right">{item.itemPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Загальна сума</TableCell>
                <TableCell className="text-right">{row.original.totalAmount}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    />
  );
}

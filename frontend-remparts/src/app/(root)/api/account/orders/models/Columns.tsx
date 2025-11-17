import { ColumnDef } from '@tanstack/react-table';
import { Square, SquareCheck } from 'lucide-react';

import { Order } from '@/entities/order';

import { sortDate } from '@/shared/component/DataTable';
import { convertDate } from '@/shared/lib';

export const columns: ColumnDef<Order>[] = [
  {
    header: 'Номер',
    accessorKey: 'id1c',
  },
  {
    header: 'Сума, USD',
    accessorKey: 'totalAmount',
    enableSorting: true,
  },
  {
    header: 'Видаткова накладна',
    accessorKey: 'invoiceId',
    cell: ({ row }) => {
      const invoiceId = row.getValue('invoiceId') as string;
      const invoiceHash = row.original.invoiceHash as string;
      return (
        <a
          href={`/api/account/invoice/${invoiceHash}`}
          target="_blank"
          rel="noreferrer"
        >
          {invoiceId}
        </a>
      );
    },
  },
  {
    header: 'Дата',
    accessorKey: 'createdAt',
    cell: v => convertDate(v.getValue() as string),
    sortingFn: (rowA, rowB, columnId) => sortDate(rowA, rowB, columnId),
    enableSorting: true,
  },
  {
    header: 'Оброблено',
    accessorKey: 'processed',
    cell: c =>
      c.getValue() ? (
        <SquareCheck
          className="m-auto block"
          strokeWidth={1}
        />
      ) : (
        <Square
          className="m-auto block"
          strokeWidth={1}
        />
      ),
    enableSorting: false,
  },
];

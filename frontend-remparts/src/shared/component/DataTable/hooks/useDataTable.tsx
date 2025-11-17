'use client';

import {
  ColumnDef,
  ExpandedState,
  SortingState,
  TableOptions,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Minus, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button, Checkbox } from '@/shared/ui';

export const useDataTable = <T extends object>(
  data: T[],
  columnsData: Array<ColumnDef<T>>,
  options?: {
    canBeSelected?: boolean;
    canBeExpanded?: boolean;
  } & Partial<Omit<TableOptions<T>, 'data' | 'columns'>>,
) => {
  const [rowSelection, setRowSelection] = useState({});
  const [editRowId, setEditRowId] = useState<string>('');
  const [deleteRowId, setDeleteRowId] = useState<string>('');
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const selectedRows = Object.keys(rowSelection).map(rowId => rowId);

  const columns = useMemo(() => {
    const columnsToRender = [...columnsData];

    if (options?.canBeSelected) {
      columnsToRender.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="w-4 translate-y-[2px] cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            aria-label="Select row"
            className="w-4 translate-y-[2px] cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    if (options?.canBeExpanded) {
      columnsToRender.push({
        id: 'expander',
        header: () => <div data-expander />,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            className="hover:text-primary-alt aspect-square h-4 w-4 bg-transparent p-0 align-middle hover:bg-transparent"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? <Minus size={10} /> : <Plus size={10} />}
          </Button>
        ),
      });
    }

    return columnsToRender;
  }, [columnsData, options?.canBeSelected, options?.canBeExpanded]);

  const clearRowIds = () => {
    setEditRowId('');
    setDeleteRowId('');
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      // ...(options?.initialState?.sorting ? {} : sorting),
      rowSelection,
      expanded: expanded,
    },
    defaultColumn: {
      enableSorting: false,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: options?.initialState?.sorting,
    },
    ...options,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    ...(options?.canBeExpanded
      ? {
          getRowCanExpand: () => true,
          getExpandedRowModel: getExpandedRowModel(),
          onExpandedChange: newExpanded => {
            const nextExpanded = typeof newExpanded === 'function' ? newExpanded({}) : newExpanded;
            setExpanded(
              Object.keys(expanded)[0] === Object.keys(nextExpanded)[0] ? {} : nextExpanded,
            );
          },
        }
      : {}),

    // getRowId: row => row.id as string, for selected rows took rowId from DB instead rowId in table
  });

  console.log(expanded, 'expanded');

  return {
    table,
    editRowId,
    deleteRowId,
    clearRowIds,
    selectedRows,
  };
};

import { Row, flexRender } from '@tanstack/react-table';
import { Table as TTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib';
import { Table } from '@/shared/ui';

import { DataTableBody } from './DataTableBody';
import { DataTableCell } from './DataTableCell';
import { DataTableHead } from './DataTableHead';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';

type Props<T> = {
  table: TTable<T>;
  subRow?: ({ row }: { row: Row<T> }) => React.ReactNode;
};

export function DataTable<T>({ table, subRow }: Props<T>) {
  return (
    <Table className="w-full table-fixed overflow-hidden sm:table-auto">
      {/* <div className="relative"> */}
      <DataTableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <DataTableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <DataTableHead
                  key={header.id}
                  className={cn(
                    'px-1 text-center [&:has([data-expander=true])]:w-[38px]',
                    'overflow-hidden text-left text-ellipsis sm:text-center',
                    header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-auto',
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.column.getCanSort() ? (
                    <div className="flex items-center gap-2 sm:justify-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getIsSorted() === 'asc' && (
                        <ArrowUpDown
                          size={14}
                          className="[&_path:nth-child(1)]:text-gray-400 [&_path:nth-child(2)]:text-gray-400"
                        />
                      )}

                      {header.column.getIsSorted() === 'desc' && (
                        <ArrowUpDown
                          size={14}
                          className="[&_path:nth-child(3)]:text-gray-400 [&_path:nth-child(4)]:text-gray-400"
                        />
                      )}

                      {header.column.getCanSort() &&
                        header.column.getIsSorted() !== 'asc' &&
                        header.column.getIsSorted() !== 'desc' && (
                          <ArrowUpDown
                            size={14}
                            className="[&_path]:text-gray-400"
                          />
                        )}
                    </div>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </DataTableHead>
              );
            })}
          </DataTableRow>
        ))}
      </DataTableHeader>
      <DataTableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <DataTableRow
                data-state={row.getIsSelected() && 'selected'}
                className={cn(row.getIsExpanded() && 'bg-muted')}
              >
                {row.getVisibleCells().map(cell => (
                  <DataTableCell
                    key={cell.id}
                    className="truncate p-1 sm:text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTableCell>
                ))}
              </DataTableRow>
              {row.getIsExpanded() && subRow && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>{subRow({ row })}</td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <DataTableRow className="px-2">No results.</DataTableRow>
        )}
      </DataTableBody>
      {/* {loading && <Overlay loading />} */}
      {/* </div> */}
    </Table>
  );
}

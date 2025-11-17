'use client';

import { Ellipsis } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const DataTableRowActions: React.FC<Props> = ({ onEdit, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-6 w-6 p-0 focus-visible:ring-0 focus-visible:ring-transparent"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
      >
        <DropdownMenuItem className="p-0">
          <Button
            onClick={onEdit}
            variant="ghost"
            className="w-full justify-start p-1 font-normal"
            size="sm"
          >
            Edit Record
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="w-full justify-start p-1 font-normal"
          >
            Delete Record
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

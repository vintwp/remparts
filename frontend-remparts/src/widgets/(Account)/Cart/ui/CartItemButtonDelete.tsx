'use client';

import { X } from 'lucide-react';

import { Button } from '@/shared/ui';

type Props = React.ComponentProps<'button'>;

export function CartItemButtonDelete({ ...props }: Props) {
  return (
    <Button
      variant="ghost"
      className="px-0 text-red-500 hover:bg-transparent hover:text-red-800 has-[>svg]:p-0"
      {...props}
    >
      <X className="size-4 md:size-5" />
    </Button>
  );
}

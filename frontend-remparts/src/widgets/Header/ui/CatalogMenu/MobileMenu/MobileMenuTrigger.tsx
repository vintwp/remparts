'use client';

import { cn } from '@/shared/lib/utils';
import { NavigationMenuTrigger } from '@/shared/ui';
import { Menu, X } from 'lucide-react';

export function MobileMenuTrigger({
  label,
  className,
  ...props
}: {
  label?: string;
  className?: string;
}) {
  return (
    <NavigationMenuTrigger
      className={cn(
        'h-8 w-8 flex-row-reverse rounded-none p-1',
        'cursor-pointer bg-transparent data-[state=open]:rotate-0',
        `hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent
        data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent`,
        className,
      )}
      indicator={
        <>
          <Menu
            size={20}
            strokeWidth={1.75}
            className="block group-data-[state=open]:hidden"
            stroke="#fff"
          />
          <X
            size={20}
            strokeWidth={1.75}
            className="hidden group-data-[state=open]:block"
            stroke="#fff"
          />
        </>
      }
      triggerMode="click"
      {...props}
    >
      {label}
    </NavigationMenuTrigger>
  );
}

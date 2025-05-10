'use client';
import { useLayoutEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuViewport,
} from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { usePathname } from 'next/navigation';
import { MobileMenuTrigger } from './MobileMenuTrigger';

type Props = {
  viewportClassName?: string;
  children: React.ReactNode;
};

export function MobileMenuRoot({ viewportClassName, children }: Props) {
  const [value, setValue] = useState<string>('');
  const pathname = usePathname();

  useLayoutEffect(() => {
    setValue('');
  }, [pathname]);

  return (
    <NavigationMenu
      disableViewport
      orientation="vertical"
      className="[&>div]:first:z-10"
      value={value}
    >
      <NavigationMenuList>
        <NavigationMenuItem value="item-1">
          <MobileMenuTrigger
            value="item-1"
            onClick={(itemValue: string) =>
              setValue(currentValue => (currentValue ? '' : itemValue))
            }
          />
          <NavigationMenuContent onPointerLeave={e => e.preventDefault()}>
            {children}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport
        className="mt-0 rounded-none"
        wrapperClassName={cn(
          'left-0 w-[calc(100vw-24px)] z-10',
          'has-[>[data-state=open]]:[&+div]:block',
          viewportClassName,
        )}
      />

      <div
        className="fixed inset-0 z-0 hidden bg-black/80"
        onClick={() => setValue('')}
      />
    </NavigationMenu>
  );
}

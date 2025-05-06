'use client';
import { useState } from 'react';
import { NavigationMenu, NavigationMenuViewport } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

type Props = {
  overlay?: boolean;
  viewportClassName?: string;
  children: React.ReactNode;
};

export function MobileMenuRoot({ overlay = true, viewportClassName, children }: Props) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <NavigationMenu
      disableViewport
      orientation="vertical"
      onValueChange={() => setIsOpened(opened => !opened)}
      className="[&>div]:first:z-10"
    >
      {children}
      <NavigationMenuViewport
        className="mt-0 rounded-none"
        wrapperClassName={cn('-left-3 w-[calc(100vw-17px)] z-10', viewportClassName)}
      />
      {overlay && isOpened && <div className="fixed inset-0 z-0 bg-black/80" />}
    </NavigationMenu>
  );
}

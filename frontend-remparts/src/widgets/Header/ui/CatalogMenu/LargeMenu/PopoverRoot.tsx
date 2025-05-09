'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { MenuIcon, X } from 'lucide-react';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export function PopoverRoot({ children }: Props) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();
  const segment = useSelectedLayoutSegments();
  const isMainPage = pathname === '/';

  const handleOpen = (e: boolean) => {
    setIsOpened(e);
  };

  useEffect(() => {
    if (pathname === '/') {
      setIsOpened(true);
    }

    if (pathname !== '/' && segment.length) {
      setIsOpened(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Popover
      open={isOpened}
      onOpenChange={handleOpen}
    >
      <PopoverTrigger
        className="flex cursor-pointer items-center gap-2 text-white"
        disabled={pathname === '/'}
      >
        {isOpened && !isMainPage && segment.length ? (
          <X
            size={20}
            strokeWidth={1.75}
          />
        ) : (
          <MenuIcon
            size={20}
            strokeWidth={1.75}
          />
        )}
        <span>Каталог товарів</span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        className="top-1/2 hidden w-[calc(100vw*3/12-8px)] rounded-none border-none p-0 shadow-none md:block
          [@media(min-width:1202px)]:w-[calc(1202px*3/12-12px)]"
        onPointerDownOutside={e => {
          if (isMainPage || !segment.length) {
            e.preventDefault();
          }
        }}
        onFocusOutside={e => {
          if (isMainPage || !segment.length) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

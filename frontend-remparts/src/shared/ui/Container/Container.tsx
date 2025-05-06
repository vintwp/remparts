import React from 'react';
import { cn } from '@/shared/lib/utils';

type PropsCommon = {
  className?: string;
  children: React.ReactNode;
};

type PropsFluid = {
  type?: 'fluid';
  align?: 'left' | 'right';
};

type PropsNormal = {
  type?: 'normal';
  align?: never;
};

type Props = PropsCommon & (PropsNormal | PropsFluid);

export const Container: React.FC<Props> = ({
  type = 'normal',
  align = 'none',
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'container mx-auto px-0',
        type === 'normal' && 'max-w-[1202px] px-3',
        type === 'fluid' && 'm-0 max-w-full',
        type === 'fluid' &&
          align === 'left' &&
          'overflow-hidden px-4 sm:pr-0 [@media(min-width:1202px)]:pl-[calc((100%-1202px)/2+1rem)]',
        className,
      )}
    >
      {children}
    </div>
  );
};

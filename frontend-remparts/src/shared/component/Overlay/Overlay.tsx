'use client';

import { useEffect } from 'react';

import { cn } from '@/shared/lib/utils';
import { Spinner, type SpinnerSize } from '@/shared/ui';

type Props = {
  size?: SpinnerSize;
  fullScreen?: boolean;
  loading?: boolean;
  className?: string;
};

export const Overlay = ({ size, fullScreen = false, loading = false, className }: Props) => {
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      if (fullScreen) {
        document.body.classList.remove('overflow-hidden');
      }
    };
  }, [fullScreen]);

  return (
    <div
      className={cn(fullScreen ? 'fixed' : 'absolute', 'inset-0', 'z-50', 'bg-black/50', className)}
    >
      <div
        className={cn(
          'flex h-full w-full items-center justify-center',
          loading ? 'flex' : 'hidden',
        )}
      >
        <Spinner
          className="spinner text-white/50"
          size={size}
        />
      </div>
    </div>
  );
};

'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

import { accountPages } from '../config/pages';

type Props = {
  className?: string;
};
export function AccountTitle({ className }: Props) {
  const path = usePathname();

  return (
    <h1 className={cn('text-2xl font-bold', className)}>
      {accountPages[path as keyof typeof accountPages]}
    </h1>
  );
}

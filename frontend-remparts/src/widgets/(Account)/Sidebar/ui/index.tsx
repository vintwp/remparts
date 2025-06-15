'use client';

import { usePathname } from 'next/navigation';

import { AccountMobileSidebar } from './AccountMobileSidebar';

export function AccountSidebar() {
  const pathname = usePathname();

  return <AccountMobileSidebar pathname={pathname} />;
}

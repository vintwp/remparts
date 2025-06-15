import { signOut } from 'next-auth/react';

import { ScrollArea, ScrollBar } from '@/shared/ui';

import { authLinks, navLinks } from '../config/links';

import { AccountSidebarButton } from './AccountSidebarButton';

export function AccountMobileSidebar({ pathname }: { pathname: string }) {
  return (
    <ScrollArea
      className="w-fullflex-grow group overflow-hidden"
      type="always"
    >
      <div className="flex justify-center gap-1 md:flex-col md:gap-0">
        {navLinks.map(link => (
          <AccountSidebarButton
            key={link.href}
            link={link.href}
            text={link.text}
            icon={link.icon}
            isActive={link.href === pathname}
          />
        ))}
        <AccountSidebarButton
          // link={authLinks[0].href}
          text={authLinks[0].text}
          icon={authLinks[0].icon}
          className="text-red-500 hover:text-red-500/50"
          onClick={() => signOut()}
        />
      </div>

      <ScrollBar
        orientation="horizontal"
        className="h-1 group-hover:h-2 md:hidden"
      />
    </ScrollArea>
  );
}

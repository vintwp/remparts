import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';

type Props = {
  href: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export function ActionIcon({ href, icon, children }: Props) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(
        'rounded-sm p-1 text-white hover:bg-white/25 hover:text-white',
        'h-8 min-w-8 font-light md:w-max',
      )}
    >
      <Link
        href={href}
        className="flex gap-0"
      >
        {children && <span className="hidden md:block">{children}</span>}
        <span>{icon}</span>
      </Link>
    </Button>
  );
}

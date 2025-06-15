import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';

export function AccountSidebarButton({
  link,
  text,
  icon,
  isActive,
  className,
  onClick,
}: {
  link?: string;
  text: string;
  icon: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        `group hover:text-primary-alt/80 text-primary h-max max-w-[88px] px-2 hover:bg-transparent
        [&_svg:not([class*='size-'])]:size-5`,
        isActive && 'text-primary-alt hover:text-primary-alt/50',
        'md:flex md:max-w-full md:justify-start',
        className,
      )}
    >
      <Link
        href={link || ''}
        className="flex flex-col items-center gap-1 md:flex-row md:gap-2"
        onClick={e => {
          if (isActive) {
            e.preventDefault();
          }

          if (onClick) onClick();
        }}
      >
        <span>{icon}</span>
        <span className={cn('text-xs md:text-base')}>{text}</span>
      </Link>
    </Button>
  );
}

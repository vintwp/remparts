import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className }: Props) {
  return (
    <Button
      variant="link"
      className={cn(
        'text-additional hover:text-primary h-min max-w-full px-0 text-xs has-[>svg]:px-0 md:text-sm',
        className,
      )}
      asChild
    >
      <Link
        href={href}
        className="leading-none"
      >
        {children}
      </Link>
    </Button>
  );
}

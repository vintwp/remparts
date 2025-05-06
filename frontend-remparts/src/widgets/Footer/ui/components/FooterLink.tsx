import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import Link from 'next/link';

type Props = {
  text: string;
  href: string;
  className?: string;
};

export function FooterLink({ text, href, className }: Props) {
  return (
    <Button
      asChild
      variant="link"
      className={cn(
        'flex h-auto justify-start p-0 text-base leading-[2] font-extralight text-white',
        className,
      )}
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}

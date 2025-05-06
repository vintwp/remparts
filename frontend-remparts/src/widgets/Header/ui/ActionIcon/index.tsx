import { Button } from '@/shared/ui';
import Link from 'next/link';

type Props = {
  href: string;
  icon: React.ReactNode;
};

export function ActionIcon({ href, icon }: Props) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-sm p-1 text-white hover:bg-white/25 hover:text-white"
    >
      <Link href={href}>{icon}</Link>
    </Button>
  );
}

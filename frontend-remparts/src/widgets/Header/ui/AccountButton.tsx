import { User } from 'lucide-react';
import Link from 'next/link';

import { auth } from '@/shared/config/auth';
import { Button } from '@/shared/ui';

export async function AccountButton() {
  const session = await auth();
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={
        'h-8 min-w-8 rounded-sm p-1 font-light text-white hover:bg-white/25 hover:text-white md:w-max'
      }
    >
      <Link
        href={session ? '/api/account' : '/api/login'}
        className="flex gap-0"
      >
        {!session && <span className="hidden md:block">Вхід</span>}
        <User
          size={20}
          strokeWidth={1.75}
          className="size-5"
        />
      </Link>
    </Button>
  );
}

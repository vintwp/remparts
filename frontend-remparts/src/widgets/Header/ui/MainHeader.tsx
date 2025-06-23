import { Suspense } from 'react';

import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui';

import { AccountButton } from './AccountButton';
import { CartButton } from './CartButton';
import { CatalogMenu } from './CatalogMenu';
import { Search } from '@/features';

type Props = {
  className?: string;
};

// TODO Add suspense to catalog menu (create skeleton)

export async function MainHeader({ className }: Props) {
  return (
    <div className={cn('bg-primary-alt', className)}>
      <Container>
        <div className="flex items-center justify-between gap-1 py-2">
          <div className="md:basis-3/12">
            <CatalogMenu />
          </div>
          <div className="max-w-[400px] grow border-0 md:grow-0 md:basis-6/12 md:pl-2">
            <Search />
          </div>
          <div className="flex gap-1 text-right md:basis-3/12 md:justify-end md:gap-4">
            <Suspense>
              <AccountButton />
            </Suspense>
            <CartButton />
          </div>
        </div>
      </Container>
    </div>
  );
}

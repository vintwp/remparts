import { Container } from '@/shared/ui';
import { CatalogMenu } from './CatalogMenu';
import { ShoppingCart, User } from 'lucide-react';
import { ActionIcon } from './ActionIcon';
import { Search } from '@/features';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

export function MainHeader({ className }: Props) {
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
            <ActionIcon
              href="/cart"
              icon={
                <ShoppingCart
                  size={20}
                  strokeWidth={1.75}
                  className="size-5"
                />
              }
            />
            <ActionIcon
              href="/login"
              icon={
                <User
                  size={20}
                  strokeWidth={1.75}
                  className="size-5"
                />
              }
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

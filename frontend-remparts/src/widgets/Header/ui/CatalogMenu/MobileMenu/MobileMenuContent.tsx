'use client';
import { NavigationMenuContent } from '@/shared/ui';

type Props = {
  children: React.ReactNode;
};

export function MobileMenuContent({ children }: Props) {
  return (
    <NavigationMenuContent onPointerLeave={e => e.preventDefault()}>
      {children}
    </NavigationMenuContent>
  );
}

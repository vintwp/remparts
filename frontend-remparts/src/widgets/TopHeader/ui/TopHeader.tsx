import { Container } from '@/shared/ui';
import { MapPinCheckInside, ShoppingCart } from 'lucide-react';
import { ButtonLink } from './ButtonLink';

export function TopHeader() {
  return (
    <Container className="border-divider border-b-[1px] px-2">
      <div className="text-additional flex h-full items-center">
        <div className="border-divider hidden border-r-[1px] pr-4 md:block">
          <ButtonLink href="/quality">Якість</ButtonLink>
        </div>
        <div className="border-divider hidden border-r-[1px] px-4 md:block">
          <ButtonLink href="/about">Про нас</ButtonLink>
        </div>
        <div className="mr-auto overflow-hidden pr-4 md:mr-0 md:ml-auto">
          <ButtonLink
            href="/signup"
            className="block truncate"
          >
            Створіть акаунт та почність робити замовлення
          </ButtonLink>
        </div>
        <div className="hidden pr-4 md:block">
          <ButtonLink href="/help">Допомога</ButtonLink>
        </div>
        <div className="md:pr-4">
          <ButtonLink href="/cart">
            <ShoppingCart className="size-[14px]" />
          </ButtonLink>
        </div>
        <div className="hidden md:block">
          <ButtonLink href="https://maps.app.goo.gl/e8Q6Ek2pzRgERbNZ9">
            <MapPinCheckInside className="size-[14px]" />
            <span className="hidden md:block">Миколаїв</span>
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

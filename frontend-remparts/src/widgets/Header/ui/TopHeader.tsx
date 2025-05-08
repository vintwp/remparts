import Image from 'next/image';
import { Button, Container } from '@/shared/ui';
import Link from 'next/link';
import { PHONE_NUMBER } from '@/shared/config';

const headerLink = [
  {
    href: '/',
    value: 'Головна',
  },
  {
    href: '/payment-and-delivery',
    value: 'Оплата і доставка',
  },
  {
    href: '/warranty-and-returns',
    value: 'Обмін та повернення',
  },
  {
    href: '/about',
    value: 'Про нас',
  },
  {
    href: '/contacts',
    value: 'Контакти',
  },
];

export function TopHeader() {
  return (
    <Container className="bg-white py-3">
      <div className="flex items-center justify-between">
        <div className="shrink-0 md:basis-2/12">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Remparts"
              width={120}
              height={30}
            />
          </Link>
        </div>
        <div
          className="[&>a]:border-r-gray [&:not(:last-child)] hidden h-6 flex-wrap items-center justify-center md:flex
            md:basis-8/12"
        >
          {headerLink.map(l => (
            <Button
              key={l.href}
              variant="link"
              asChild
              className="border-gray h-min rounded-none px-2 py-0 leading-6 font-light [&:not(:last-child)]:border-r-[1px]"
            >
              <Link href={l.href}>{l.value}</Link>
            </Button>
          ))}
        </div>
        <div className="text-right md:basis-2/12">
          <Button
            variant="link"
            asChild
            className="rounded-none p-0"
          >
            <Link href={`tel:${PHONE_NUMBER.href}`}>{PHONE_NUMBER.value}</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button, Container } from '@/shared/ui';

export default function ForbiddenPage() {
  return (
    <Container className='bg-["#f5f5f5"]'>
      <div className="min-h-[50vh] pt-8 pb-16">
        <div className="relative overflow-hidden">
          <h2
            className={cn(
              'text-7xl leading-[1.5] font-bold text-[rgba(31,45,61,0.04)] md:text-[144px]',
              `after:absolute after:top-0 after:left-2 after:z-[1] after:block after:h-full after:w-full
              after:content-["Error_403"] md:after:left-4`,
            )}
          >
            Error 403
          </h2>
        </div>

        <p className='mt-12 text-3xl leading-normal font-bold text-["#1f2d3d"] md:text-5xl'>
          У вас немає доступу до цільової сторінки
        </p>

        <Button
          asChild
          className="bg-primary-alt mx-auto mt-24 block h-auto w-max cursor-pointer px-10 text-3xl font-normal md:mt-32"
        >
          <Link href="/">На головну</Link>
        </Button>
      </div>
    </Container>
  );
}

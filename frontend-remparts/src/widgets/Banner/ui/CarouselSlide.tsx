import Image from 'next/image';
import Link from 'next/link';

import { Banner } from '@/entities/banner';

import { CarouselItem } from '@/shared/ui';

type Props = {
  banner: Banner;
};

export function CarouselSlide({ banner }: Props) {
  return (
    <CarouselItem
      className="relative h-full max-h-[255px] after:block after:w-full after:pb-[100%] after:content-['']
        md:max-h-[355px]"
    >
      <Link href={banner.targetUrl}>
        <Image
          alt={banner.targetUrl}
          src={banner.imageUrl}
          objectFit="cover"
          fill
        />
      </Link>
    </CarouselItem>
  );
}

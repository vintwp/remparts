import { Banner as TBanner } from '@/entities/banner';

import { CarouselRoot } from './CarouselRoot';

export async function Banner() {
  const banners: TBanner[] = [
    {
      id: 1,
      imageUrl: '/banner/banner-1.jpg',
      targetUrl: '#',
    },
    {
      id: 2,
      imageUrl: '/banner/banner-2.jpg',
      targetUrl: '#',
    },
    {
      id: 2,
      imageUrl: '/banner/banner-3.jpg',
      targetUrl: '#',
    },
  ];

  return (
    <div className="flex">
      <div className="shrink-0 grow-0 basis-0 md:basis-3/12" />
      <div className="shrink-0 grow-0 basis-full overflow-hidden py-2 md:basis-9/12 md:pl-2">
        <CarouselRoot banners={banners} />
      </div>
    </div>
  );
}

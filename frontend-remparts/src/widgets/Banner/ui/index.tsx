import { getBanners } from '@/entities/banner';

import { CarouselRoot } from './CarouselRoot';

export async function Banner() {
  const banner = await getBanners();

  return (
    <div className="flex">
      <div className="shrink-0 grow-0 basis-0 md:basis-3/12" />
      <div className="shrink-0 grow-0 basis-full overflow-hidden py-2 md:basis-9/12 md:pl-2">
        <CarouselRoot banners={banner.ok ? banner.data : []} />
      </div>
    </div>
  );
}

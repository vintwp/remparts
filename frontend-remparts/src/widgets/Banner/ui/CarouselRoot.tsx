'use client';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { CarouselSlide } from './CarouselSlide';
import { Banner } from '@/entities/banner';
import { Carousel, CarouselContent, CarouselDots } from '@/shared/ui';

type Props = {
  banners: Banner[];
};

export function CarouselRoot({ banners }: Props) {
  return (
    <Carousel
      plugins={[
        Fade(),
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="">
        {banners.map(banner => (
          <CarouselSlide
            key={`banner-${banner.imageUrl}`}
            banner={banner}
          />
        ))}
      </CarouselContent>
      <CarouselDots className="absolute bottom-4 left-1/2 -translate-x-1/2" />
    </Carousel>
  );
}

import { prisma } from '../prisma';

const banners = [
  {
    imageUrl: 'banner/banner-1.jpg',
    targetUrl: '/',
  },
  {
    imageUrl: 'banner/banner-2.jpg',
    targetUrl: '/repairing service',
  },
  {
    imageUrl: 'banner/banner-3.jpg',
    targetUrl: '/payment-and-delivery.jpg',
  },
];

export async function createBanners() {
  for (const banner of banners) {
    await prisma.banner.create({
      data: {
        imageUrl: banner.imageUrl,
        targetUrl: banner.targetUrl,
      },
    });
  }
}

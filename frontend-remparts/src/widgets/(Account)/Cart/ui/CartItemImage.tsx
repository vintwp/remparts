import Image from 'next/image';

import { BACKEND_DOMAIN } from '@/shared/config';

type Props = {
  img: string;
  name: string;
};

export function CartItemImage({ img, name }: Props) {
  return (
    <div className="relative aspect-square w-12 overflow-hidden rounded-tl-sm rounded-bl-sm p-1 md:w-20">
      <Image
        alt={name}
        src={`${BACKEND_DOMAIN}/${img}`}
        fill
        className="h-full w-full object-contain"
      />
    </div>
  );
}

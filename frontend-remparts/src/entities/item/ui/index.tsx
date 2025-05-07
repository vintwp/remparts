import Image from 'next/image';
import { Item as IItem } from '@/shared/types';
import { DOMAIN } from '@/shared/config';
import { StockLabel } from './StockLabel';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

type Props = {
  item: IItem;
};

export function Item({ item }: Props) {
  return (
    <div
      className={cn(
        'border-additional/40 flex h-full flex-wrap rounded-sm border-[1px] hover:shadow-md md:flex-nowrap',
        item.stock === 0 && 'opacity-80 hover:shadow-none',
      )}
    >
      <div className="-z-1 basis-3/12 overflow-hidden rounded-tl-sm rounded-bl-sm pt-2 md:basis-1/12">
        <Image
          alt={item.name}
          src={`${DOMAIN}/${item.images[0].link}`}
          width={110}
          height={110}
        />
      </div>
      <div className="basis-9/12 px-1 py-2 md:basis-8/12 md:px-0">
        <p className="text-xs text-[12px] text-black/30">Код товару - {item.id}</p>
        <p className="mb-2 text-[18px] leading-5">{item.name}</p>
        <StockLabel stock={item.stock} />
      </div>
      <div
        className="flex basis-full overflow-hidden bg-gray-50 px-3 py-2 md:basis-3/12 md:flex-col md:rounded-tr-sm
          md:rounded-br-sm md:p-0"
      >
        <div className="flex grow-1 items-center justify-center gap-4">
          <p className="text-2xl leading-none font-semibold">{item.price}</p>
          <span className="text-xs">грн.</span>
        </div>
        <Button
          className="bg-primary-alt hover:bg-primary-alt/80 rounded-sm md:w-full md:rounded-none"
          disabled={item.stock === 0}
        >
          Купити
        </Button>
      </div>
    </div>
  );
}

import Image from 'next/image';

import { BACKEND_DOMAIN } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import { Item as IItem } from '@/shared/types';
import { Button } from '@/shared/ui';

import { StockLabel } from './StockLabel';

function Item({ isStock, children }: { isStock: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'border-additional/40 flex h-full flex-wrap rounded-sm border-[1px] hover:shadow-md md:flex-nowrap',
        isStock && 'opacity-80 hover:shadow-none',
      )}
    >
      {children}
    </div>
  );
}

function ItemImage({ images, name }: { images: IItem['images']; name: string }) {
  return (
    <div className="-z-1 basis-3/12 overflow-hidden rounded-tl-sm rounded-bl-sm pt-2 md:basis-1/12">
      <Image
        alt={name}
        src={`${BACKEND_DOMAIN}/${images[0].link}`}
        width={110}
        height={110}
      />
    </div>
  );
}

function ItemBody({ id, name, stock }: { id: number; name: string; stock: number }) {
  return (
    <div className="basis-9/12 px-1 py-2 md:basis-8/12 md:px-0">
      <p className="text-xs text-[12px] text-black/30">Код товару - {id}</p>
      <p className="mb-2 text-[18px] leading-5">{name}</p>
      <StockLabel stock={stock} />
    </div>
  );
}

function ItemActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        `flex basis-full overflow-hidden bg-gray-50 px-3 py-2 md:basis-3/12 md:flex-col md:rounded-tr-sm
        md:rounded-br-sm md:p-0 md:pt-1`,
        className,
      )}
    >
      {children}
    </div>
  );
}

function ItemPrice({ price, currency }: { price: number; currency: 'грн.' | 'USD' }) {
  return (
    <div className="flex grow-1 items-center justify-center gap-2">
      <p className="text-2xl leading-none font-semibold">{price}</p>
      <span className="text-xs">{currency}</span>
    </div>
  );
}

function ItemBuyButton({ isStock }: { isStock: boolean }) {
  return (
    <Button
      className="bg-primary-alt hover:bg-primary-alt/80 rounded-sm md:w-full md:rounded-none"
      disabled={!isStock}
    >
      Купити
    </Button>
  );
}

Item.Image = ItemImage;
Item.Body = ItemBody;
Item.Actions = ItemActions;
Item.Price = ItemPrice;
Item.BuyButton = ItemBuyButton;

export { Item };

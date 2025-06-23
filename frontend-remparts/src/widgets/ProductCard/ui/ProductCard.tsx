import { Suspense } from 'react';

import { Item } from '@/entities/item';

import { Item as IItem } from '@/shared/types';

import { ProductAddToCart } from './ProductAddToCart';
import { ProductCardPrice } from './ProductCardPrice';

type Props = {
  item: IItem;
};

export async function ProductCard({ item }: Props) {
  return (
    <Item
      isStock={item.stock > 0}
      key={item.id}
    >
      <Item.Image
        images={item.images}
        name={item.name}
      />
      <Item.Body
        id={item.id}
        name={item.name}
        stock={item.stock}
      />
      <Item.Actions className="flex items-center justify-between">
        <Suspense fallback={null}>
          <ProductCardPrice price={item.price} />
        </Suspense>
        <Suspense fallback={null}>
          <ProductAddToCart item={item} />
        </Suspense>
      </Item.Actions>
    </Item>
  );
}

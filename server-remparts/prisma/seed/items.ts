import { prisma } from '../prisma';
import * as itemsJson from '../../src/asset/items.json';

type ItemJson = {
  row_id: number;
  item_id: string;
  name: string;
  price: number;
  dep_id: number;
  cat_id: number;
  brand: string;
  brand_id: number;
  quality: string;
  complianceWith?: string;
};

type InitialItemsJson = {
  items: ItemJson[];
};

const initialItems: InitialItemsJson = itemsJson;

export async function createItems() {
  for (const item of initialItems.items) {
    await prisma.item.create({
      data: {
        dbId: item.item_id,
        name: item.name,
        price: item.price,
        stock: Math.round(Math.random() * 1),
        department: {
          connect: {
            id: item.dep_id,
          },
        },
        category: {
          connect: {
            id: item.cat_id,
          },
        },
        brand: {
          connect: {
            id: item.brand_id,
          },
        },
        quality: {
          ...(item.quality
            ? {
                connectOrCreate: {
                  where: {
                    value: item.quality,
                  },
                  create: {
                    value: item.quality,
                  },
                },
              }
            : {}),
        },
        compliance: {
          ...(item.complianceWith
            ? {
                connectOrCreate: {
                  where: {
                    value: item.complianceWith,
                  },
                  create: {
                    value: item.complianceWith,
                  },
                },
              }
            : {}),
        },
        images: {
          create: {
            link: 'no-image.png',
          },
        },
      },
    });

    await prisma.category.update({
      where: {
        id: item.cat_id,
      },
      data: {
        brand: {
          connect: {
            id: item.brand_id,
          },
        },
        complianceWith: {
          ...(item.complianceWith
            ? {
                connect: {
                  value: item.complianceWith,
                },
              }
            : {}),
        },
        quality: {
          ...(item.quality
            ? {
                connect: {
                  value: item.quality,
                },
              }
            : {}),
        },
      },
    });
  }
}

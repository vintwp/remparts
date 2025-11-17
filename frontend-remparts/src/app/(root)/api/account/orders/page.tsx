import { Metadata } from 'next';
import { Suspense } from 'react';

import { Order } from '@/entities/order';

import { DataTableSkeleton } from '@/shared/component/DataTable/ui';
import { delay } from '@/shared/lib';

import { Orders } from './ui';

export const metadata: Metadata = {
  title: 'Замовлення',
};

const orders: Array<
  Order & {
    items: {
      itemId: number;
      itemQty: number;
      itemPrice: number;
      itemAmount: number;
      itemName: string;
    }[];
  }
> = [
  {
    id: 2,
    id1c: '0000000001',
    orderHash: '11171538055171660565',
    userEmail: 'root@gmail.com',
    processed: true,
    comment: 'Обработано',
    totalAmount: 802.95,
    invoiceId: '0000002972',
    invoiceHash: '11286732765865926152',
    createdAt: '2025-09-20T21:10:54.453Z',
    items: [
      {
        itemId: 13611,
        itemQty: 1,
        itemName: 'Дисплей iPhone 14 Pro чорний (переклеєний)',
        itemPrice: 385.82,
        itemAmount: 385.82,
      },
      {
        itemId: 13680,
        itemQty: 1,
        itemName: 'Дисплей iPhone 15 Pro Max чорний (Сервісний оригінал)',
        itemPrice: 370,
        itemAmount: 370,
      },
      {
        itemId: 13792,
        itemQty: 1,
        itemName:
          'Дисплей (LCD) Lenovo Tab M10 Plus 3nd Gen TB125FU/ TB128FU/ Xiaoxin Pad 2022 з сенсором чорний',
        itemPrice: 34.15,
        itemAmount: 34.15,
      },
      {
        itemId: 13810,
        itemQty: 1,
        itemName: 'Дисплей Huawei Honor 10 Lite/ Honor 20 Lite/ 10i/ 20i/ 20e чорний',
        itemPrice: 12.98,
        itemAmount: 12.98,
      },
    ],
  },
  {
    id: 3,
    id1c: '0000000002',
    orderHash: '11171539461580278806',
    userEmail: 'root@gmail.com',
    processed: true,
    comment: 'Обработано',
    totalAmount: 424.73,
    invoiceId: '0000002973',
    invoiceHash: '11286734172274544393',
    createdAt: '2025-09-21T16:32:05.361Z',
    items: [
      {
        itemId: 13930,
        itemQty: 1,
        itemName: 'Дисплей Huawei P Smart Z 2019/ Y9 Prime 2019/ Honor 9X Global чорний оригінал',
        itemPrice: 19.5,
        itemAmount: 19.5,
      },
      {
        itemId: 13890,
        itemQty: 1,
        itemName: 'Дисплей Huawei P20 Lite Dual Sim (ANE-L21/ ANE-LX1)/ Nova 3e чорний оригінал',
        itemPrice: 16.4,
        itemAmount: 16.4,
      },
      {
        itemId: 13814,
        itemQty: 1,
        itemName: 'Дисплей Huawei Honor 20 (YAL-L21)/ Honor 20 Pro/ Nova 5T чорний оригінал',
        itemPrice: 18.83,
        itemAmount: 18.83,
      },
      {
        itemId: 13680,
        itemQty: 1,
        itemName: 'Дисплей iPhone 15 Pro Max чорний (Сервісний оригінал)',
        itemPrice: 370,
        itemAmount: 370,
      },
    ],
  },
];
async function f() {
  await delay(5000);
  return orders;
}

export default async function OrdersPage() {
  const orders = f();

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <Orders ordersPromise={orders} />
    </Suspense>
  );
}

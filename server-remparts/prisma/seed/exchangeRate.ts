import { prisma } from '../prisma';

export async function setExchangeRate() {
  await prisma.exchangeRate.create({
    data: {
      value: 1,
    },
  });
}

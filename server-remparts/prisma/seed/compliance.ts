import { prisma } from '../prisma';

const compliances = [
  {
    value: 'Universal',
    id: 499,
  },
  {
    value: 'Apple Watch',
    id: 1,
  },
  {
    value: 'Google Pixel',
    id: 2,
  },
  {
    value: 'Huawei / Honor',
    id: 3,
  },
  {
    value: 'Infinix',
    id: 4,
  },
  {
    value: 'Apple Ipad',
    id: 5,
  },
  {
    value: 'Apple iPhone',
    id: 6,
  },
  {
    value: 'Lenovo',
    id: 7,
  },
  {
    value: 'LG',
    id: 8,
  },
  {
    value: 'Meizu',
    id: 9,
  },
  {
    value: 'Motorola',
    id: 10,
  },
  {
    value: 'Nokia / Microsoft',
    id: 11,
  },
  {
    value: 'OnePlus',
    id: 12,
  },
  {
    value: 'Oppo',
    id: 13,
  },
  {
    value: 'Realme',
    id: 14,
  },
  {
    value: 'Samsung',
    id: 15,
  },
  {
    value: 'Tecno',
    id: 16,
  },
  {
    value: 'TP-Link',
    id: 17,
  },
  {
    value: 'Vivo',
    id: 18,
  },
  {
    value: 'Xiaomi',
    id: 19,
  },
  {
    value: 'ZTE',
    id: 20,
  },
  {
    value: 'Sony',
    id: 21,
  },
  {
    value: 'Asus',
    id: 22,
  },
  {
    value: 'Blackview',
    id: 23,
  },
  {
    value: 'Doogee',
    id: 24,
  },
  {
    value: 'iHunt',
    id: 25,
  },
];

const compliancesToCategories = [
  {
    categoryId: 5,
    complianceId: 1,
  },
  {
    categoryId: 5,
    complianceId: 2,
  },
  {
    categoryId: 5,
    complianceId: 3,
  },
  {
    categoryId: 5,
    complianceId: 4,
  },
  {
    categoryId: 5,
    complianceId: 5,
  },
  {
    categoryId: 5,
    complianceId: 6,
  },
  {
    categoryId: 5,
    complianceId: 7,
  },
  {
    categoryId: 5,
    complianceId: 8,
  },
  {
    categoryId: 5,
    complianceId: 10,
  },
  {
    categoryId: 5,
    complianceId: 9,
  },
  {
    categoryId: 5,
    complianceId: 11,
  },
  {
    categoryId: 5,
    complianceId: 12,
  },
  {
    categoryId: 5,
    complianceId: 13,
  },
  {
    categoryId: 5,
    complianceId: 14,
  },
  {
    categoryId: 5,
    complianceId: 15,
  },
  {
    categoryId: 5,
    complianceId: 16,
  },
  {
    categoryId: 5,
    complianceId: 17,
  },
  {
    categoryId: 5,
    complianceId: 18,
  },
  {
    categoryId: 5,
    complianceId: 19,
  },
  {
    categoryId: 5,
    complianceId: 20,
  },
  {
    categoryId: 6,
    complianceId: 52,
  },
  {
    categoryId: 6,
    complianceId: 51,
  },
  {
    categoryId: 6,
    complianceId: 53,
  },
  {
    categoryId: 6,
    complianceId: 54,
  },
  {
    categoryId: 6,
    complianceId: 55,
  },
  {
    categoryId: 8,
    complianceId: 57,
  },
  {
    categoryId: 8,
    complianceId: 56,
  },
  {
    categoryId: 8,
    complianceId: 58,
  },
  {
    categoryId: 16,
    complianceId: 1,
  },
  {
    categoryId: 16,
    complianceId: 5,
  },
  {
    categoryId: 16,
    complianceId: 3,
  },
  {
    categoryId: 16,
    complianceId: 4,
  },
  {
    categoryId: 16,
    complianceId: 6,
  },
  {
    categoryId: 16,
    complianceId: 7,
  },
  {
    categoryId: 16,
    complianceId: 8,
  },
  {
    categoryId: 16,
    complianceId: 9,
  },
  {
    categoryId: 16,
    complianceId: 10,
  },
  {
    categoryId: 16,
    complianceId: 11,
  },
  {
    categoryId: 16,
    complianceId: 13,
  },
  {
    categoryId: 16,
    complianceId: 14,
  },
  {
    categoryId: 16,
    complianceId: 15,
  },
  {
    categoryId: 16,
    complianceId: 21,
  },
  {
    categoryId: 16,
    complianceId: 16,
  },
  {
    categoryId: 16,
    complianceId: 18,
  },
  {
    categoryId: 16,
    complianceId: 19,
  },
  {
    categoryId: 16,
    complianceId: 20,
  },
  {
    categoryId: 16,
    complianceId: 22,
  },
  {
    categoryId: 16,
    complianceId: 23,
  },
  {
    categoryId: 16,
    complianceId: 24,
  },
  {
    categoryId: 16,
    complianceId: 2,
  },
  {
    categoryId: 16,
    complianceId: 25,
  },
  {
    categoryId: 16,
    complianceId: 12,
  },
  {
    categoryId: 16,
    complianceId: 28,
  },
  {
    categoryId: 16,
    complianceId: 29,
  },
  {
    categoryId: 16,
    complianceId: 30,
  },
  {
    categoryId: 16,
    complianceId: 499,
  },
  {
    categoryId: 25,
    complianceId: 1,
  },
  {
    categoryId: 25,
    complianceId: 22,
  },
  {
    categoryId: 25,
    complianceId: 3,
  },
  {
    categoryId: 25,
    complianceId: 5,
  },
  {
    categoryId: 25,
    complianceId: 6,
  },
  {
    categoryId: 25,
    complianceId: 7,
  },
  {
    categoryId: 25,
    complianceId: 8,
  },
  {
    categoryId: 25,
    complianceId: 9,
  },
  {
    categoryId: 25,
    complianceId: 10,
  },
  {
    categoryId: 25,
    complianceId: 11,
  },
  {
    categoryId: 25,
    complianceId: 12,
  },
  {
    categoryId: 25,
    complianceId: 13,
  },
  {
    categoryId: 25,
    complianceId: 14,
  },
  {
    categoryId: 25,
    complianceId: 15,
  },
  {
    categoryId: 25,
    complianceId: 16,
  },
  {
    categoryId: 25,
    complianceId: 18,
  },
  {
    categoryId: 25,
    complianceId: 19,
  },
  {
    categoryId: 6,
    complianceId: 59,
  },
  {
    categoryId: 12,
    complianceId: 61,
  },
  {
    categoryId: 12,
    complianceId: 60,
  },
  {
    categoryId: 13,
    complianceId: 1,
  },
  {
    categoryId: 13,
    complianceId: 31,
  },
  {
    categoryId: 26,
    complianceId: 6,
  },
  {
    categoryId: 26,
    complianceId: 13,
  },
  {
    categoryId: 26,
    complianceId: 3,
  },
  {
    categoryId: 26,
    complianceId: 10,
  },
  {
    categoryId: 26,
    complianceId: 14,
  },
  {
    categoryId: 26,
    complianceId: 15,
  },
  {
    categoryId: 26,
    complianceId: 16,
  },
  {
    categoryId: 26,
    complianceId: 19,
  },
  {
    categoryId: 26,
    complianceId: 20,
  },
  {
    categoryId: 26,
    complianceId: 32,
  },
  {
    categoryId: 26,
    complianceId: 5,
  },
  {
    categoryId: 28,
    complianceId: 499,
  },
  {
    categoryId: 28,
    complianceId: 1,
  },
  {
    categoryId: 28,
    complianceId: 5,
  },
  {
    categoryId: 29,
    complianceId: 6,
  },
  {
    categoryId: 29,
    complianceId: 499,
  },
  {
    categoryId: 30,
    complianceId: 6,
  },
  {
    categoryId: 31,
    complianceId: 3,
  },
  {
    categoryId: 31,
    complianceId: 4,
  },
  {
    categoryId: 31,
    complianceId: 6,
  },
  {
    categoryId: 31,
    complianceId: 10,
  },
  {
    categoryId: 31,
    complianceId: 13,
  },
  {
    categoryId: 31,
    complianceId: 14,
  },
  {
    categoryId: 31,
    complianceId: 15,
  },
  {
    categoryId: 31,
    complianceId: 16,
  },
  {
    categoryId: 31,
    complianceId: 19,
  },
  {
    categoryId: 31,
    complianceId: 20,
  },
  {
    categoryId: 32,
    complianceId: 6,
  },
  {
    categoryId: 33,
    complianceId: 3,
  },
  {
    categoryId: 33,
    complianceId: 5,
  },
  {
    categoryId: 33,
    complianceId: 6,
  },
  {
    categoryId: 33,
    complianceId: 7,
  },
  {
    categoryId: 33,
    complianceId: 10,
  },
  {
    categoryId: 33,
    complianceId: 11,
  },
  {
    categoryId: 33,
    complianceId: 13,
  },
  {
    categoryId: 33,
    complianceId: 15,
  },
  {
    categoryId: 33,
    complianceId: 21,
  },
  {
    categoryId: 33,
    complianceId: 16,
  },
  {
    categoryId: 33,
    complianceId: 19,
  },
  {
    categoryId: 33,
    complianceId: 1,
  },
  {
    categoryId: 34,
    complianceId: 1,
  },
  {
    categoryId: 34,
    complianceId: 23,
  },
  {
    categoryId: 34,
    complianceId: 24,
  },
  {
    categoryId: 34,
    complianceId: 2,
  },
  {
    categoryId: 34,
    complianceId: 26,
  },
  {
    categoryId: 34,
    complianceId: 3,
  },
  {
    categoryId: 34,
    complianceId: 11,
  },
  {
    categoryId: 34,
    complianceId: 5,
  },
  {
    categoryId: 34,
    complianceId: 6,
  },
  {
    categoryId: 34,
    complianceId: 7,
  },
  {
    categoryId: 34,
    complianceId: 8,
  },
  {
    categoryId: 34,
    complianceId: 10,
  },
  {
    categoryId: 34,
    complianceId: 13,
  },
  {
    categoryId: 34,
    complianceId: 29,
  },
  {
    categoryId: 34,
    complianceId: 14,
  },
  {
    categoryId: 34,
    complianceId: 15,
  },
  {
    categoryId: 34,
    complianceId: 21,
  },
  {
    categoryId: 34,
    complianceId: 16,
  },
  {
    categoryId: 34,
    complianceId: 33,
  },
  {
    categoryId: 34,
    complianceId: 18,
  },
  {
    categoryId: 34,
    complianceId: 19,
  },
  {
    categoryId: 34,
    complianceId: 20,
  },
  {
    categoryId: 35,
    complianceId: 3,
  },
  {
    categoryId: 35,
    complianceId: 6,
  },
  {
    categoryId: 35,
    complianceId: 5,
  },
  {
    categoryId: 35,
    complianceId: 15,
  },
  {
    categoryId: 35,
    complianceId: 24,
  },
  {
    categoryId: 35,
    complianceId: 22,
  },
  {
    categoryId: 35,
    complianceId: 23,
  },
  {
    categoryId: 35,
    complianceId: 34,
  },
  {
    categoryId: 35,
    complianceId: 7,
  },
  {
    categoryId: 35,
    complianceId: 8,
  },
  {
    categoryId: 35,
    complianceId: 9,
  },
  {
    categoryId: 35,
    complianceId: 10,
  },
  {
    categoryId: 35,
    complianceId: 11,
  },
  {
    categoryId: 35,
    complianceId: 13,
  },
  {
    categoryId: 35,
    complianceId: 21,
  },
  {
    categoryId: 35,
    complianceId: 19,
  },
  {
    categoryId: 35,
    complianceId: 20,
  },
  {
    categoryId: 37,
    complianceId: 6,
  },
  {
    categoryId: 37,
    complianceId: 5,
  },
  {
    categoryId: 37,
    complianceId: 7,
  },
  {
    categoryId: 37,
    complianceId: 9,
  },
  {
    categoryId: 37,
    complianceId: 15,
  },
  {
    categoryId: 37,
    complianceId: 19,
  },
  {
    categoryId: 38,
    complianceId: 11,
  },
  {
    categoryId: 38,
    complianceId: 15,
  },
  {
    categoryId: 39,
    complianceId: 6,
  },
  {
    categoryId: 40,
    complianceId: 1,
  },
  {
    categoryId: 40,
    complianceId: 5,
  },
  {
    categoryId: 40,
    complianceId: 6,
  },
  {
    categoryId: 40,
    complianceId: 7,
  },
  {
    categoryId: 40,
    complianceId: 15,
  },
  {
    categoryId: 40,
    complianceId: 16,
  },
  {
    categoryId: 40,
    complianceId: 33,
  },
  {
    categoryId: 40,
    complianceId: 19,
  },
  {
    categoryId: 41,
    complianceId: 1,
  },
  {
    categoryId: 41,
    complianceId: 3,
  },
  {
    categoryId: 41,
    complianceId: 4,
  },
  {
    categoryId: 41,
    complianceId: 5,
  },
  {
    categoryId: 41,
    complianceId: 6,
  },
  {
    categoryId: 41,
    complianceId: 7,
  },
  {
    categoryId: 41,
    complianceId: 10,
  },
  {
    categoryId: 41,
    complianceId: 11,
  },
  {
    categoryId: 41,
    complianceId: 13,
  },
  {
    categoryId: 41,
    complianceId: 14,
  },
  {
    categoryId: 41,
    complianceId: 15,
  },
  {
    categoryId: 41,
    complianceId: 21,
  },
  {
    categoryId: 41,
    complianceId: 16,
  },
  {
    categoryId: 41,
    complianceId: 18,
  },
  {
    categoryId: 41,
    complianceId: 19,
  },
  {
    categoryId: 41,
    complianceId: 20,
  },
  {
    categoryId: 43,
    complianceId: 62,
  },
  {
    categoryId: 43,
    complianceId: 63,
  },
  {
    categoryId: 43,
    complianceId: 22,
  },
  {
    categoryId: 43,
    complianceId: 64,
  },
  {
    categoryId: 43,
    complianceId: 65,
  },
  {
    categoryId: 43,
    complianceId: 66,
  },
  {
    categoryId: 43,
    complianceId: 7,
  },
  {
    categoryId: 43,
    complianceId: 67,
  },
  {
    categoryId: 43,
    complianceId: 15,
  },
  {
    categoryId: 43,
    complianceId: 21,
  },
  {
    categoryId: 43,
    complianceId: 68,
  },
  {
    categoryId: 44,
    complianceId: 63,
  },
  {
    categoryId: 45,
    complianceId: 66,
  },
  {
    categoryId: 45,
    complianceId: 22,
  },
  {
    categoryId: 45,
    complianceId: 64,
  },
  {
    categoryId: 45,
    complianceId: 7,
  },
  {
    categoryId: 45,
    complianceId: 63,
  },
  {
    categoryId: 45,
    complianceId: 15,
  },
  {
    categoryId: 45,
    complianceId: 21,
  },
  {
    categoryId: 45,
    complianceId: 68,
  },
  {
    categoryId: 46,
    complianceId: 15,
  },
  {
    categoryId: 46,
    complianceId: 499,
  },
  {
    categoryId: 45,
    complianceId: 51,
  },
  {
    categoryId: 45,
    complianceId: 62,
  },
  {
    categoryId: 45,
    complianceId: 499,
  },
  {
    categoryId: 48,
    complianceId: 62,
  },
  {
    categoryId: 48,
    complianceId: 63,
  },
  {
    categoryId: 48,
    complianceId: 7,
  },
  {
    categoryId: 49,
    complianceId: 63,
  },
];

export async function createCompliances() {
  const compliancesToUpload = compliances.map(compl => {
    const categoriesByCompliance = compliancesToCategories
      .filter(complCat => complCat.complianceId === compl.id)
      .map(compl => compl.categoryId);

    return {
      id: compl.id,
      value: compl.value,
      categories: categoriesByCompliance,
    };
  });

  for (const compliance of compliancesToUpload) {
    await prisma.compliance.upsert({
      where: {
        id: compliance.id,
      },
      update: {
        value: compliance.value,
      },
      create: {
        id: compliance.id,
        value: compliance.value,
        category: {
          connect: compliance.categories.map(compl => ({ id: compl })),
        },
      },
    });
  }
}

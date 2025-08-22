import { prisma } from '../prisma';

const qualities = [
  {
    value: 'No quality',
    id: 1,
  },
  {
    value: 'Оригінал (AAAA)',
    id: 2,
  },
  {
    value: 'Оригінал (Сервісний)',
    id: 3,
  },
  {
    value: 'Оригінал Б.В.',
    id: 4,
  },
  {
    value: 'Оригінал (AAA)',
    id: 5,
  },
  {
    value: 'High Copy (AA)',
    id: 6,
  },
  {
    value: 'Copy (A)',
    id: 7,
  },
  {
    value: 'Оригінал (Відновлений)',
    id: 8,
  },
];

const qualitiesToCategories = [
  {
    categoryId: 2,
    qualityId: 1,
  },
  {
    categoryId: 3,
    qualityId: 1,
  },
  {
    categoryId: 4,
    qualityId: 1,
  },
  {
    categoryId: 5,
    qualityId: 1,
  },
  {
    categoryId: 6,
    qualityId: 5,
  },
  {
    categoryId: 6,
    qualityId: 4,
  },
  {
    categoryId: 6,
    qualityId: 2,
  },
  {
    categoryId: 7,
    qualityId: 1,
  },
  {
    categoryId: 8,
    qualityId: 1,
  },
  {
    categoryId: 9,
    qualityId: 1,
  },
  {
    categoryId: 10,
    qualityId: 1,
  },
  {
    categoryId: 11,
    qualityId: 1,
  },
  {
    categoryId: 12,
    qualityId: 1,
  },
  {
    categoryId: 13,
    qualityId: 1,
  },
  {
    categoryId: 14,
    qualityId: 1,
  },
  {
    categoryId: 15,
    qualityId: 1,
  },
  {
    categoryId: 16,
    qualityId: 1,
  },
  {
    categoryId: 17,
    qualityId: 1,
  },
  {
    categoryId: 18,
    qualityId: 1,
  },
  {
    categoryId: 19,
    qualityId: 1,
  },
  {
    categoryId: 20,
    qualityId: 1,
  },
  {
    categoryId: 1,
    qualityId: 1,
  },
  {
    categoryId: 21,
    qualityId: 1,
  },
  {
    categoryId: 22,
    qualityId: 1,
  },
  {
    categoryId: 7,
    qualityId: 2,
  },
  {
    categoryId: 23,
    qualityId: 1,
  },
  {
    categoryId: 24,
    qualityId: 1,
  },
  {
    categoryId: 25,
    qualityId: 1,
  },
  {
    categoryId: 26,
    qualityId: 1,
  },
  {
    categoryId: 26,
    qualityId: 6,
  },
  {
    categoryId: 26,
    qualityId: 5,
  },
  {
    categoryId: 26,
    qualityId: 2,
  },
  {
    categoryId: 26,
    qualityId: 3,
  },
  {
    categoryId: 26,
    qualityId: 4,
  },
  {
    categoryId: 27,
    qualityId: 1,
  },
  {
    categoryId: 28,
    qualityId: 1,
  },
  {
    categoryId: 29,
    qualityId: 1,
  },
  {
    categoryId: 30,
    qualityId: 1,
  },
  {
    categoryId: 31,
    qualityId: 1,
  },
  {
    categoryId: 32,
    qualityId: 1,
  },
  {
    categoryId: 33,
    qualityId: 1,
  },
  {
    categoryId: 34,
    qualityId: 5,
  },
  {
    categoryId: 34,
    qualityId: 4,
  },
  {
    categoryId: 34,
    qualityId: 2,
  },
  {
    categoryId: 34,
    qualityId: 6,
  },
  {
    categoryId: 35,
    qualityId: 5,
  },
  {
    categoryId: 35,
    qualityId: 2,
  },
  {
    categoryId: 35,
    qualityId: 4,
  },
  {
    categoryId: 35,
    qualityId: 8,
  },
  {
    categoryId: 35,
    qualityId: 6,
  },
  {
    categoryId: 35,
    qualityId: 3,
  },
  {
    categoryId: 35,
    qualityId: 7,
  },
  {
    categoryId: 36,
    qualityId: 5,
  },
  {
    categoryId: 36,
    qualityId: 4,
  },
  {
    categoryId: 36,
    qualityId: 2,
  },
  {
    categoryId: 36,
    qualityId: 1,
  },
  {
    categoryId: 38,
    qualityId: 1,
  },
  {
    categoryId: 39,
    qualityId: 1,
  },
  {
    categoryId: 40,
    qualityId: 1,
  },
  {
    categoryId: 41,
    qualityId: 5,
  },
  {
    categoryId: 41,
    qualityId: 2,
  },
  {
    categoryId: 42,
    qualityId: 5,
  },
  {
    categoryId: 42,
    qualityId: 2,
  },
  {
    categoryId: 42,
    qualityId: 4,
  },
  {
    categoryId: 42,
    qualityId: 7,
  },
  {
    categoryId: 43,
    qualityId: 1,
  },
  {
    categoryId: 44,
    qualityId: 1,
  },
  {
    categoryId: 45,
    qualityId: 1,
  },
  {
    categoryId: 46,
    qualityId: 6,
  },
  {
    categoryId: 46,
    qualityId: 7,
  },
  {
    categoryId: 46,
    qualityId: 5,
  },
  {
    categoryId: 47,
    qualityId: 1,
  },
  {
    categoryId: 46,
    qualityId: 2,
  },
  {
    categoryId: 48,
    qualityId: 1,
  },
  {
    categoryId: 49,
    qualityId: 1,
  },
  {
    categoryId: 50,
    qualityId: 1,
  },
  {
    categoryId: 51,
    qualityId: 1,
  },
  {
    categoryId: 52,
    qualityId: 1,
  },
  {
    categoryId: 53,
    qualityId: 1,
  },
  {
    categoryId: 54,
    qualityId: 1,
  },
  {
    categoryId: 55,
    qualityId: 1,
  },
  {
    categoryId: 57,
    qualityId: 1,
  },
  {
    categoryId: 56,
    qualityId: 1,
  },
  {
    categoryId: 58,
    qualityId: 1,
  },
  {
    categoryId: 59,
    qualityId: 1,
  },
  {
    categoryId: 60,
    qualityId: 1,
  },
  {
    categoryId: 61,
    qualityId: 1,
  },
  {
    categoryId: 76,
    qualityId: 1,
  },
  {
    categoryId: 62,
    qualityId: 1,
  },
  {
    categoryId: 63,
    qualityId: 1,
  },
  {
    categoryId: 64,
    qualityId: 1,
  },
  {
    categoryId: 65,
    qualityId: 1,
  },
  {
    categoryId: 66,
    qualityId: 1,
  },
  {
    categoryId: 67,
    qualityId: 1,
  },
  {
    categoryId: 69,
    qualityId: 1,
  },
  {
    categoryId: 68,
    qualityId: 1,
  },
  {
    categoryId: 70,
    qualityId: 1,
  },
  {
    categoryId: 71,
    qualityId: 1,
  },
  {
    categoryId: 72,
    qualityId: 1,
  },
  {
    categoryId: 73,
    qualityId: 1,
  },
  {
    categoryId: 74,
    qualityId: 1,
  },
  {
    categoryId: 75,
    qualityId: 1,
  },
];

export async function createQualities() {
  const qualitiesToUpload = qualities.map(q => {
    const qualitiesByCategory = qualitiesToCategories
      .filter(qual => qual.qualityId === q.id)
      .map(qual => qual.categoryId);

    return {
      id: q.id,
      value: q.value,
      categories: qualitiesByCategory,
    };
  });

  for (const quality of qualitiesToUpload) {
    await prisma.quality.upsert({
      where: {
        id: quality.id,
      },
      update: {
        value: quality.value,
      },
      create: {
        id: quality.id,
        value: quality.value,
        category: {
          connect: quality.categories.map(qual => ({ id: qual })),
        },
      },
    });
  }
}

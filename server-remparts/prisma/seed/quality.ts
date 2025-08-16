import { prisma } from '../prisma';

const qualities = [
  {
    value: 'Оригінал (AAAA)',
    id: 1,
  },
  {
    value: 'Оригінал (Сервісний)',
    id: 2,
  },
  {
    value: 'Оригінал Б.В.',
    id: 3,
  },
  {
    value: 'Оригінал (AAA)',
    id: 4,
  },
  {
    value: 'High Copy (AA)',
    id: 5,
  },
  {
    value: 'Copy (A)',
    id: 6,
  },
  {
    value: 'Оригінал (Відновлений)',
    id: 7,
  },
];

const qualitiesToCategories = [
  {
    categoryId: 5,
    qualityId: 4,
  },
  {
    categoryId: 5,
    qualityId: 3,
  },
  {
    categoryId: 5,
    qualityId: 1,
  },
  {
    categoryId: 6,
    qualityId: 1,
  },
  {
    categoryId: 25,
    qualityId: 5,
  },
  {
    categoryId: 25,
    qualityId: 4,
  },
  {
    categoryId: 25,
    qualityId: 1,
  },
  {
    categoryId: 25,
    qualityId: 2,
  },
  {
    categoryId: 25,
    qualityId: 3,
  },
  {
    categoryId: 33,
    qualityId: 4,
  },
  {
    categoryId: 33,
    qualityId: 3,
  },
  {
    categoryId: 33,
    qualityId: 1,
  },
  {
    categoryId: 33,
    qualityId: 5,
  },
  {
    categoryId: 34,
    qualityId: 4,
  },
  {
    categoryId: 34,
    qualityId: 1,
  },
  {
    categoryId: 34,
    qualityId: 3,
  },
  {
    categoryId: 34,
    qualityId: 7,
  },
  {
    categoryId: 34,
    qualityId: 5,
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
    qualityId: 4,
  },
  {
    categoryId: 35,
    qualityId: 3,
  },
  {
    categoryId: 35,
    qualityId: 1,
  },
  {
    categoryId: 40,
    qualityId: 4,
  },
  {
    categoryId: 40,
    qualityId: 1,
  },
  {
    categoryId: 41,
    qualityId: 4,
  },
  {
    categoryId: 41,
    qualityId: 1,
  },
  {
    categoryId: 41,
    qualityId: 3,
  },
  {
    categoryId: 41,
    qualityId: 6,
  },
  {
    categoryId: 45,
    qualityId: 5,
  },
  {
    categoryId: 45,
    qualityId: 6,
  },
  {
    categoryId: 45,
    qualityId: 4,
  },
  {
    categoryId: 45,
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

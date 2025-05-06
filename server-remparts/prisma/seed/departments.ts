import { prisma } from '../prisma';

const departments = [
  {
    id: 1,
    order: 1,
    url: 'spares-for-mobile-phones',
    name: 'Запчастини до мобільних телефонів та планшетів',
  },
  {
    id: 2,
    order: 2,
    url: 'accessories-for-mobile-phones',
    name: 'Аксесуари до мобільних телефонів',
  },
  {
    id: 3,
    order: 3,
    url: 'accessories-for-computers',
    name: "Комп'ютерні аксесуари",
  },
  {
    id: 4,
    order: 4,
    url: 'smartphones-and-electronics',
    name: 'Смартфони та електроніка',
  },
  {
    id: 5,
    order: 5,
    url: 'repair-equipment',
    name: 'Обладнання для ремонту',
  },
  {
    id: 6,
    order: 6,
    url: 'spares-for-notebooks',
    name: 'Запчастини до ноутбуків',
  },
  { id: 7, order: 7, url: 'miscellaneous', name: 'Інше' },
];

export async function createDepartments() {
  for (const department of departments) {
    await prisma.department.create({
      data: {
        id: department.id,
        name: department.name,
        url: department.url,
        order: department.order,
      },
    });
  }

  await prisma.$queryRaw`ALTER SEQUENCE department_department_id_seq RESTART WITH 8`;
}

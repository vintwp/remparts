import { createUrl } from '../../src/lib/utils';
import { prisma } from '../prisma';

const departments = [
  {
    name: 'Автомобільні аксесуари',
    id: 1,
    order: 7,
  },
  {
    name: 'Аксесуари до мобільних телефонів і смартфонів',
    id: 2,
    order: 2,
  },
  {
    name: 'Запчастини для мобільних телефонів і смартфонів',
    id: 3,
    order: 1,
  },
  {
    name: "Комп'ютерні аксесуари",
    id: 4,
    order: 6,
  },
  {
    name: 'Смартфони та електроніка',
    id: 5,
    order: 8,
  },
  {
    name: 'Обладнання для ремонту',
    id: 6,
    order: 3,
  },
  {
    name: 'Витратні матеріали для ремонту та обслуговування',
    id: 7,
    order: 4,
  },
  {
    name: 'Запчастини і аксесуари для ноутбуків',
    id: 8,
    order: 5,
  },
];

export async function createDepartments() {
  for (const department of departments) {
    await prisma.department.create({
      data: {
        name: department.name,
        url: createUrl(department.name),
        order: department.order,
      },
    });
  }

  // await prisma.$queryRaw`ALTER SEQUENCE department_department_id_seq RESTART WITH 8`;
}

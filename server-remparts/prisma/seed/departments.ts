import { createUrl } from '../../src/lib/utils';
import { prisma } from '../prisma';

const departments = [
  {
    name: 'No department',
    id: 1,
    order: 99,
    isVisible: false,
  },
  {
    name: 'Автомобільні аксесуари',
    id: 2,
    order: 7,
    isVisible: true,
  },
  {
    name: 'Аксесуари до мобільних телефонів і смартфонів',
    id: 3,
    order: 2,
    isVisible: true,
  },
  {
    name: 'Запчастини для мобільних телефонів і смартфонів',
    id: 4,
    order: 1,
    isVisible: true,
  },
  {
    name: "Комп'ютерні аксесуари",
    id: 5,
    order: 6,
    isVisible: true,
  },
  {
    name: 'Смартфони та електроніка',
    id: 6,
    order: 8,
    isVisible: true,
  },
  {
    name: 'Обладнання для ремонту',
    id: 7,
    order: 3,
    isVisible: true,
  },
  {
    name: 'Витратні матеріали для ремонту та обслуговування',
    id: 8,
    order: 4,
    isVisible: true,
  },
  {
    name: 'Запчастини і аксесуари для ноутбуків',
    id: 9,
    order: 5,
    isVisible: true,
  },
];

export async function createDepartments() {
  for (const department of departments) {
    await prisma.department.create({
      data: {
        name: department.name,
        url: createUrl(department.name),
        order: department.order,
        isVisible: department.isVisible,
      },
    });
  }

  // await prisma.$queryRaw`ALTER SEQUENCE department_department_id_seq RESTART WITH 8`;
}

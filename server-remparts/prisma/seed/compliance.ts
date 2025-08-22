import { prisma } from '../prisma';

const compliances = [
  {
    value: 'No Compliance',
    id: 1,
    isVisible: false,
  },
  {
    value: 'Apple Watch',
    id: 2,
    isVisible: true,
  },
  {
    value: 'Google Pixel',
    id: 3,
    isVisible: true,
  },
  {
    value: 'Huawei / Honor',
    id: 4,
    isVisible: true,
  },
  {
    value: 'Infinix',
    id: 5,
    isVisible: true,
  },
  {
    value: 'Apple Ipad',
    id: 6,
    isVisible: true,
  },
  {
    value: 'Apple iPhone',
    id: 7,
    isVisible: true,
  },
  {
    value: 'Lenovo',
    id: 8,
    isVisible: true,
  },
  {
    value: 'LG',
    id: 9,
    isVisible: true,
  },
  {
    value: 'Meizu',
    id: 10,
    isVisible: true,
  },
  {
    value: 'Motorola',
    id: 11,
    isVisible: true,
  },
  {
    value: 'Nokia / Microsoft',
    id: 12,
    isVisible: true,
  },
  {
    value: 'OnePlus',
    id: 13,
    isVisible: true,
  },
  {
    value: 'Oppo',
    id: 14,
    isVisible: true,
  },
  {
    value: 'Realme',
    id: 15,
    isVisible: true,
  },
  {
    value: 'Samsung',
    id: 16,
    isVisible: true,
  },
  {
    value: 'Tecno',
    id: 17,
    isVisible: true,
  },
  {
    value: 'TP-Link',
    id: 18,
    isVisible: true,
  },
  {
    value: 'Vivo',
    id: 19,
    isVisible: true,
  },
  {
    value: 'Xiaomi',
    id: 20,
    isVisible: true,
  },
  {
    value: 'ZTE',
    id: 21,
    isVisible: true,
  },
  {
    value: 'Sony',
    id: 22,
    isVisible: true,
  },
  {
    value: 'Asus',
    id: 23,
    isVisible: true,
  },
  {
    value: 'Blackview',
    id: 24,
    isVisible: true,
  },
  {
    value: 'Doogee',
    id: 25,
    isVisible: true,
  },
  {
    value: 'iHunt',
    id: 26,
    isVisible: true,
  },
  {
    value: 'Hotwav',
    id: 27,
    isVisible: true,
  },
  {
    value: 'Oscal',
    id: 29,
    isVisible: true,
  },
  {
    value: 'Oukitel',
    id: 30,
    isVisible: true,
  },
  {
    value: 'Samsung Watch',
    id: 31,
    isVisible: true,
  },
  {
    value: 'Xiaomi Mi Band',
    id: 32,
    isVisible: true,
  },
  {
    value: 'Apple AirPods',
    id: 33,
    isVisible: true,
  },
  {
    value: 'Ulefone',
    id: 34,
    isVisible: true,
  },
  {
    value: 'Fly',
    id: 35,
    isVisible: true,
  },
  {
    value: 'Type C',
    id: 52,
    isVisible: true,
  },
  {
    value: 'HDMI',
    id: 53,
    isVisible: true,
  },
  {
    value: 'Lightning',
    id: 54,
    isVisible: true,
  },
  {
    value: 'Micro USB',
    id: 55,
    isVisible: true,
  },
  {
    value: 'Display Port',
    id: 56,
    isVisible: true,
  },
  {
    value: 'AUX',
    id: 60,
    isVisible: true,
  },
  {
    value: 'Мережевий зарядний пристрів',
    id: 57,
    isVisible: true,
  },
  {
    value: 'Автомобільний зарядний пристрій',
    id: 58,
    isVisible: true,
  },
  {
    value: 'Перехідник',
    id: 59,
    isVisible: true,
  },
  {
    value: 'Провідні',
    id: 61,
    isVisible: true,
  },
  {
    value: 'Безпровідні',
    id: 62,
    isVisible: true,
  },
  {
    value: 'Acer',
    id: 63,
    isVisible: true,
  },
  {
    value: 'Apple Macbook',
    id: 64,
    isVisible: true,
  },
  {
    value: 'DELL',
    id: 65,
    isVisible: true,
  },
  {
    value: 'Fujitsu',
    id: 66,
    isVisible: true,
  },
  {
    value: 'HP',
    id: 67,
    isVisible: true,
  },
  {
    value: 'MSI',
    id: 68,
    isVisible: true,
  },
  {
    value: 'Toshiba',
    id: 69,
    isVisible: true,
  },
  {
    value: 'Універсальний',
    id: 500,
    isVisible: true,
  },
];

const compliancesToCategories = [
  {
    categoryId: 2,
    complianceId: 1,
  },
  {
    categoryId: 3,
    complianceId: 1,
  },
  {
    categoryId: 4,
    complianceId: 1,
  },
  {
    categoryId: 5,
    complianceId: 1,
  },
  {
    categoryId: 6,
    complianceId: 2,
  },
  {
    categoryId: 6,
    complianceId: 1,
  },
  {
    categoryId: 6,
    complianceId: 3,
  },
  {
    categoryId: 6,
    complianceId: 4,
  },
  {
    categoryId: 6,
    complianceId: 5,
  },
  {
    categoryId: 6,
    complianceId: 6,
  },
  {
    categoryId: 6,
    complianceId: 7,
  },
  {
    categoryId: 6,
    complianceId: 8,
  },
  {
    categoryId: 6,
    complianceId: 9,
  },
  {
    categoryId: 6,
    complianceId: 11,
  },
  {
    categoryId: 6,
    complianceId: 10,
  },
  {
    categoryId: 6,
    complianceId: 12,
  },
  {
    categoryId: 6,
    complianceId: 13,
  },
  {
    categoryId: 6,
    complianceId: 14,
  },
  {
    categoryId: 6,
    complianceId: 15,
  },
  {
    categoryId: 6,
    complianceId: 16,
  },
  {
    categoryId: 6,
    complianceId: 17,
  },
  {
    categoryId: 6,
    complianceId: 18,
  },
  {
    categoryId: 6,
    complianceId: 19,
  },
  {
    categoryId: 6,
    complianceId: 20,
  },
  {
    categoryId: 6,
    complianceId: 21,
  },
  {
    categoryId: 7,
    complianceId: 53,
  },
  {
    categoryId: 7,
    complianceId: 52,
  },
  {
    categoryId: 7,
    complianceId: 1,
  },
  {
    categoryId: 8,
    complianceId: 1,
  },
  {
    categoryId: 9,
    complianceId: 1,
  },
  {
    categoryId: 7,
    complianceId: 54,
  },
  {
    categoryId: 7,
    complianceId: 55,
  },
  {
    categoryId: 10,
    complianceId: 1,
  },
  {
    categoryId: 7,
    complianceId: 56,
  },
  {
    categoryId: 11,
    complianceId: 1,
  },
  {
    categoryId: 12,
    complianceId: 1,
  },
  {
    categoryId: 13,
    complianceId: 1,
  },
  {
    categoryId: 14,
    complianceId: 1,
  },
  {
    categoryId: 15,
    complianceId: 1,
  },
  {
    categoryId: 16,
    complianceId: 1,
  },
  {
    categoryId: 9,
    complianceId: 58,
  },
  {
    categoryId: 9,
    complianceId: 57,
  },
  {
    categoryId: 9,
    complianceId: 59,
  },
  {
    categoryId: 17,
    complianceId: 2,
  },
  {
    categoryId: 17,
    complianceId: 6,
  },
  {
    categoryId: 17,
    complianceId: 4,
  },
  {
    categoryId: 17,
    complianceId: 5,
  },
  {
    categoryId: 17,
    complianceId: 7,
  },
  {
    categoryId: 17,
    complianceId: 8,
  },
  {
    categoryId: 17,
    complianceId: 9,
  },
  {
    categoryId: 17,
    complianceId: 10,
  },
  {
    categoryId: 17,
    complianceId: 11,
  },
  {
    categoryId: 17,
    complianceId: 12,
  },
  {
    categoryId: 17,
    complianceId: 14,
  },
  {
    categoryId: 17,
    complianceId: 15,
  },
  {
    categoryId: 17,
    complianceId: 16,
  },
  {
    categoryId: 17,
    complianceId: 22,
  },
  {
    categoryId: 17,
    complianceId: 17,
  },
  {
    categoryId: 17,
    complianceId: 19,
  },
  {
    categoryId: 17,
    complianceId: 20,
  },
  {
    categoryId: 17,
    complianceId: 21,
  },
  {
    categoryId: 17,
    complianceId: 23,
  },
  {
    categoryId: 17,
    complianceId: 24,
  },
  {
    categoryId: 17,
    complianceId: 25,
  },
  {
    categoryId: 17,
    complianceId: 3,
  },
  {
    categoryId: 17,
    complianceId: 26,
  },
  {
    categoryId: 17,
    complianceId: 13,
  },
  {
    categoryId: 17,
    complianceId: 29,
  },
  {
    categoryId: 17,
    complianceId: 30,
  },
  {
    categoryId: 17,
    complianceId: 31,
  },
  {
    categoryId: 17,
    complianceId: 500,
  },
  {
    categoryId: 17,
    complianceId: 1,
  },
  {
    categoryId: 18,
    complianceId: 1,
  },
  {
    categoryId: 19,
    complianceId: 1,
  },
  {
    categoryId: 20,
    complianceId: 1,
  },
  {
    categoryId: 1,
    complianceId: 1,
  },
  {
    categoryId: 21,
    complianceId: 1,
  },
  {
    categoryId: 22,
    complianceId: 1,
  },
  {
    categoryId: 23,
    complianceId: 1,
  },
  {
    categoryId: 24,
    complianceId: 1,
  },
  {
    categoryId: 25,
    complianceId: 1,
  },
  {
    categoryId: 26,
    complianceId: 2,
  },
  {
    categoryId: 26,
    complianceId: 23,
  },
  {
    categoryId: 26,
    complianceId: 4,
  },
  {
    categoryId: 26,
    complianceId: 6,
  },
  {
    categoryId: 26,
    complianceId: 7,
  },
  {
    categoryId: 26,
    complianceId: 8,
  },
  {
    categoryId: 26,
    complianceId: 9,
  },
  {
    categoryId: 26,
    complianceId: 10,
  },
  {
    categoryId: 26,
    complianceId: 11,
  },
  {
    categoryId: 26,
    complianceId: 12,
  },
  {
    categoryId: 26,
    complianceId: 13,
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
    complianceId: 17,
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
    categoryId: 7,
    complianceId: 60,
  },
  {
    categoryId: 13,
    complianceId: 62,
  },
  {
    categoryId: 13,
    complianceId: 61,
  },
  {
    categoryId: 14,
    complianceId: 2,
  },
  {
    categoryId: 14,
    complianceId: 32,
  },
  {
    categoryId: 27,
    complianceId: 7,
  },
  {
    categoryId: 27,
    complianceId: 14,
  },
  {
    categoryId: 27,
    complianceId: 4,
  },
  {
    categoryId: 27,
    complianceId: 11,
  },
  {
    categoryId: 27,
    complianceId: 15,
  },
  {
    categoryId: 27,
    complianceId: 16,
  },
  {
    categoryId: 27,
    complianceId: 17,
  },
  {
    categoryId: 27,
    complianceId: 20,
  },
  {
    categoryId: 27,
    complianceId: 21,
  },
  {
    categoryId: 27,
    complianceId: 33,
  },
  {
    categoryId: 27,
    complianceId: 6,
  },
  {
    categoryId: 28,
    complianceId: 1,
  },
  {
    categoryId: 29,
    complianceId: 500,
  },
  {
    categoryId: 29,
    complianceId: 2,
  },
  {
    categoryId: 29,
    complianceId: 6,
  },
  {
    categoryId: 30,
    complianceId: 7,
  },
  {
    categoryId: 30,
    complianceId: 500,
  },
  {
    categoryId: 31,
    complianceId: 7,
  },
  {
    categoryId: 32,
    complianceId: 4,
  },
  {
    categoryId: 32,
    complianceId: 5,
  },
  {
    categoryId: 32,
    complianceId: 7,
  },
  {
    categoryId: 32,
    complianceId: 11,
  },
  {
    categoryId: 32,
    complianceId: 14,
  },
  {
    categoryId: 32,
    complianceId: 15,
  },
  {
    categoryId: 32,
    complianceId: 16,
  },
  {
    categoryId: 32,
    complianceId: 17,
  },
  {
    categoryId: 32,
    complianceId: 20,
  },
  {
    categoryId: 32,
    complianceId: 21,
  },
  {
    categoryId: 33,
    complianceId: 7,
  },
  {
    categoryId: 34,
    complianceId: 4,
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
    complianceId: 11,
  },
  {
    categoryId: 34,
    complianceId: 12,
  },
  {
    categoryId: 34,
    complianceId: 14,
  },
  {
    categoryId: 34,
    complianceId: 16,
  },
  {
    categoryId: 34,
    complianceId: 22,
  },
  {
    categoryId: 34,
    complianceId: 17,
  },
  {
    categoryId: 34,
    complianceId: 20,
  },
  {
    categoryId: 34,
    complianceId: 2,
  },
  {
    categoryId: 35,
    complianceId: 2,
  },
  {
    categoryId: 35,
    complianceId: 24,
  },
  {
    categoryId: 35,
    complianceId: 25,
  },
  {
    categoryId: 35,
    complianceId: 3,
  },
  {
    categoryId: 35,
    complianceId: 27,
  },
  {
    categoryId: 35,
    complianceId: 4,
  },
  {
    categoryId: 35,
    complianceId: 12,
  },
  {
    categoryId: 35,
    complianceId: 6,
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
    complianceId: 11,
  },
  {
    categoryId: 35,
    complianceId: 14,
  },
  {
    categoryId: 35,
    complianceId: 30,
  },
  {
    categoryId: 35,
    complianceId: 15,
  },
  {
    categoryId: 35,
    complianceId: 16,
  },
  {
    categoryId: 35,
    complianceId: 22,
  },
  {
    categoryId: 35,
    complianceId: 17,
  },
  {
    categoryId: 35,
    complianceId: 34,
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
    categoryId: 35,
    complianceId: 21,
  },
  {
    categoryId: 36,
    complianceId: 4,
  },
  {
    categoryId: 36,
    complianceId: 7,
  },
  {
    categoryId: 36,
    complianceId: 6,
  },
  {
    categoryId: 36,
    complianceId: 16,
  },
  {
    categoryId: 36,
    complianceId: 25,
  },
  {
    categoryId: 36,
    complianceId: 23,
  },
  {
    categoryId: 36,
    complianceId: 24,
  },
  {
    categoryId: 36,
    complianceId: 35,
  },
  {
    categoryId: 36,
    complianceId: 8,
  },
  {
    categoryId: 36,
    complianceId: 9,
  },
  {
    categoryId: 36,
    complianceId: 10,
  },
  {
    categoryId: 36,
    complianceId: 11,
  },
  {
    categoryId: 36,
    complianceId: 12,
  },
  {
    categoryId: 36,
    complianceId: 14,
  },
  {
    categoryId: 36,
    complianceId: 22,
  },
  {
    categoryId: 36,
    complianceId: 20,
  },
  {
    categoryId: 36,
    complianceId: 21,
  },
  {
    categoryId: 38,
    complianceId: 7,
  },
  {
    categoryId: 38,
    complianceId: 6,
  },
  {
    categoryId: 38,
    complianceId: 8,
  },
  {
    categoryId: 38,
    complianceId: 10,
  },
  {
    categoryId: 38,
    complianceId: 16,
  },
  {
    categoryId: 38,
    complianceId: 20,
  },
  {
    categoryId: 39,
    complianceId: 12,
  },
  {
    categoryId: 39,
    complianceId: 16,
  },
  {
    categoryId: 40,
    complianceId: 7,
  },
  {
    categoryId: 41,
    complianceId: 2,
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
    complianceId: 8,
  },
  {
    categoryId: 41,
    complianceId: 16,
  },
  {
    categoryId: 41,
    complianceId: 17,
  },
  {
    categoryId: 41,
    complianceId: 34,
  },
  {
    categoryId: 41,
    complianceId: 20,
  },
  {
    categoryId: 42,
    complianceId: 2,
  },
  {
    categoryId: 42,
    complianceId: 4,
  },
  {
    categoryId: 42,
    complianceId: 5,
  },
  {
    categoryId: 42,
    complianceId: 6,
  },
  {
    categoryId: 42,
    complianceId: 7,
  },
  {
    categoryId: 42,
    complianceId: 8,
  },
  {
    categoryId: 42,
    complianceId: 11,
  },
  {
    categoryId: 42,
    complianceId: 12,
  },
  {
    categoryId: 42,
    complianceId: 14,
  },
  {
    categoryId: 42,
    complianceId: 15,
  },
  {
    categoryId: 42,
    complianceId: 16,
  },
  {
    categoryId: 42,
    complianceId: 22,
  },
  {
    categoryId: 42,
    complianceId: 17,
  },
  {
    categoryId: 42,
    complianceId: 19,
  },
  {
    categoryId: 42,
    complianceId: 20,
  },
  {
    categoryId: 42,
    complianceId: 21,
  },
  {
    categoryId: 43,
    complianceId: 1,
  },
  {
    categoryId: 44,
    complianceId: 63,
  },
  {
    categoryId: 44,
    complianceId: 64,
  },
  {
    categoryId: 44,
    complianceId: 23,
  },
  {
    categoryId: 44,
    complianceId: 65,
  },
  {
    categoryId: 44,
    complianceId: 66,
  },
  {
    categoryId: 44,
    complianceId: 67,
  },
  {
    categoryId: 44,
    complianceId: 8,
  },
  {
    categoryId: 44,
    complianceId: 68,
  },
  {
    categoryId: 44,
    complianceId: 16,
  },
  {
    categoryId: 44,
    complianceId: 22,
  },
  {
    categoryId: 44,
    complianceId: 69,
  },
  {
    categoryId: 45,
    complianceId: 64,
  },
  {
    categoryId: 46,
    complianceId: 67,
  },
  {
    categoryId: 46,
    complianceId: 23,
  },
  {
    categoryId: 46,
    complianceId: 65,
  },
  {
    categoryId: 46,
    complianceId: 8,
  },
  {
    categoryId: 46,
    complianceId: 64,
  },
  {
    categoryId: 46,
    complianceId: 16,
  },
  {
    categoryId: 46,
    complianceId: 22,
  },
  {
    categoryId: 46,
    complianceId: 69,
  },
  {
    categoryId: 47,
    complianceId: 16,
  },
  {
    categoryId: 47,
    complianceId: 500,
  },
  {
    categoryId: 46,
    complianceId: 52,
  },
  {
    categoryId: 46,
    complianceId: 63,
  },
  {
    categoryId: 46,
    complianceId: 500,
  },
  {
    categoryId: 48,
    complianceId: 1,
  },
  {
    categoryId: 49,
    complianceId: 63,
  },
  {
    categoryId: 49,
    complianceId: 64,
  },
  {
    categoryId: 49,
    complianceId: 8,
  },
  {
    categoryId: 50,
    complianceId: 64,
  },
  {
    categoryId: 51,
    complianceId: 1,
  },
  {
    categoryId: 52,
    complianceId: 1,
  },
  {
    categoryId: 53,
    complianceId: 1,
  },
  {
    categoryId: 54,
    complianceId: 1,
  },
  {
    categoryId: 55,
    complianceId: 1,
  },
  {
    categoryId: 57,
    complianceId: 1,
  },
  {
    categoryId: 56,
    complianceId: 1,
  },
  {
    categoryId: 58,
    complianceId: 1,
  },
  {
    categoryId: 59,
    complianceId: 1,
  },
  {
    categoryId: 60,
    complianceId: 1,
  },
  {
    categoryId: 61,
    complianceId: 1,
  },
  {
    categoryId: 76,
    complianceId: 1,
  },
  {
    categoryId: 62,
    complianceId: 1,
  },
  {
    categoryId: 63,
    complianceId: 1,
  },
  {
    categoryId: 64,
    complianceId: 1,
  },
  {
    categoryId: 65,
    complianceId: 1,
  },
  {
    categoryId: 66,
    complianceId: 1,
  },
  {
    categoryId: 67,
    complianceId: 1,
  },
  {
    categoryId: 69,
    complianceId: 1,
  },
  {
    categoryId: 68,
    complianceId: 1,
  },
  {
    categoryId: 70,
    complianceId: 1,
  },
  {
    categoryId: 71,
    complianceId: 1,
  },
  {
    categoryId: 72,
    complianceId: 1,
  },
  {
    categoryId: 73,
    complianceId: 1,
  },
  {
    categoryId: 74,
    complianceId: 1,
  },
  {
    categoryId: 75,
    complianceId: 1,
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

  await prisma.$queryRaw`ALTER SEQUENCE compliance_compliance_id_seq RESTART WITH 500`;
}

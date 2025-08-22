import { prisma } from '../prisma';

const brands = [
  {
    name: 'No Brand',
    id: 1,
    isVisible: false,
  },
  {
    name: 'Hoco',
    id: 2,
    isVisible: true,
  },
  {
    name: 'Borofone',
    id: 3,
    isVisible: true,
  },
  {
    name: 'Baseus',
    id: 4,
    isVisible: true,
  },
  {
    name: 'Golf',
    id: 5,
    isVisible: true,
  },
  {
    name: 'Remax',
    id: 6,
    isVisible: true,
  },
  {
    name: 'Apple',
    id: 7,
    isVisible: true,
  },
  {
    name: 'JBL',
    id: 8,
    isVisible: true,
  },
  {
    name: 'Google',
    id: 9,
    isVisible: true,
  },
  {
    name: 'Huawei / Honor',
    id: 10,
    isVisible: true,
  },
  {
    name: 'Infinix',
    id: 11,
    isVisible: true,
  },
  {
    name: 'Lenovo',
    id: 12,
    isVisible: true,
  },
  {
    name: 'LG',
    id: 13,
    isVisible: true,
  },
  {
    name: 'Meizu',
    id: 14,
    isVisible: true,
  },
  {
    name: 'Motorola',
    id: 15,
    isVisible: true,
  },
  {
    name: 'Nokia / Microsoft',
    id: 16,
    isVisible: true,
  },
  {
    name: 'OnePlus',
    id: 17,
    isVisible: true,
  },
  {
    name: 'Oppo',
    id: 18,
    isVisible: true,
  },
  {
    name: 'Realme',
    id: 19,
    isVisible: true,
  },
  {
    name: 'Samsung',
    id: 20,
    isVisible: true,
  },
  {
    name: 'Tecno',
    id: 21,
    isVisible: true,
  },
  {
    name: 'TP-Link',
    id: 22,
    isVisible: true,
  },
  {
    name: 'Vivo',
    id: 23,
    isVisible: true,
  },
  {
    name: 'Xiaomi',
    id: 24,
    isVisible: true,
  },
  {
    name: 'ZTE',
    id: 25,
    isVisible: true,
  },
  {
    name: 'Essager',
    id: 26,
    isVisible: true,
  },
  {
    name: 'Usams',
    id: 27,
    isVisible: true,
  },
  {
    name: 'Mibrand',
    id: 28,
    isVisible: true,
  },
  {
    name: 'Ugreen',
    id: 29,
    isVisible: true,
  },
  {
    name: 'ADATA',
    id: 30,
    isVisible: true,
  },
  {
    name: 'XPG',
    id: 31,
    isVisible: true,
  },
  {
    name: 'Wiwu',
    id: 32,
    isVisible: true,
  },
  {
    name: 'Howear',
    id: 33,
    isVisible: true,
  },
  {
    name: 'Duracell',
    id: 34,
    isVisible: true,
  },
  {
    name: 'GP',
    id: 35,
    isVisible: true,
  },
  {
    name: 'LogicPower',
    id: 36,
    isVisible: true,
  },
  {
    name: 'PkCell',
    id: 37,
    isVisible: true,
  },
  {
    name: 'Sony',
    id: 38,
    isVisible: true,
  },
  {
    name: 'UFO',
    id: 39,
    isVisible: true,
  },
  {
    name: 'Videx',
    id: 40,
    isVisible: true,
  },
  {
    name: 'Varta',
    id: 41,
    isVisible: true,
  },
  {
    name: 'Aida',
    id: 42,
    isVisible: true,
  },
  {
    name: 'Sunshine',
    id: 43,
    isVisible: true,
  },
  {
    name: 'Keweisi',
    id: 44,
    isVisible: true,
  },
  {
    name: 'Ridea',
    id: 45,
    isVisible: true,
  },
  {
    name: 'XO',
    id: 46,
    isVisible: true,
  },
  {
    name: '6D King Fire',
    id: 47,
    isVisible: true,
  },
  {
    name: 'Full Glue',
    id: 48,
    isVisible: true,
  },
  {
    name: 'Super G',
    id: 49,
    isVisible: true,
  },
  {
    name: '2.5D',
    id: 50,
    isVisible: true,
  },
  {
    name: '6D OG Crown',
    id: 51,
    isVisible: true,
  },
  {
    name: '6D Angel',
    id: 52,
    isVisible: true,
  },
  {
    name: 'GA Violet',
    id: 53,
    isVisible: true,
  },
  {
    name: 'GA OG Privacy',
    id: 54,
    isVisible: true,
  },
  {
    name: 'OG',
    id: 55,
    isVisible: true,
  },
  {
    name: '9D',
    id: 57,
    isVisible: true,
  },
  {
    name: 'Yosee',
    id: 58,
    isVisible: true,
  },
  {
    name: 'iVON',
    id: 59,
    isVisible: true,
  },
  {
    name: 'Kingston',
    id: 60,
    isVisible: true,
  },
  {
    name: 'Team',
    id: 62,
    isVisible: true,
  },
  {
    name: 'Apacer',
    id: 63,
    isVisible: true,
  },
  {
    name: 'Crown',
    id: 64,
    isVisible: true,
  },
  {
    name: 'Dell',
    id: 65,
    isVisible: true,
  },
  {
    name: 'Gembird',
    id: 66,
    isVisible: true,
  },
  {
    name: 'Logitech',
    id: 67,
    isVisible: true,
  },
  {
    name: 'Fantech',
    id: 68,
    isVisible: true,
  },
  {
    name: 'Havic',
    id: 69,
    isVisible: true,
  },
  {
    name: 'HP',
    id: 70,
    isVisible: true,
  },
  {
    name: 'Asus',
    id: 71,
    isVisible: true,
  },
  {
    name: 'Krystal Magsafe',
    id: 72,
    isVisible: true,
  },
  {
    name: 'Silicone Case',
    id: 73,
    isVisible: true,
  },
  {
    name: 'TPU',
    id: 74,
    isVisible: true,
  },
  {
    name: 'Carbon Protect',
    id: 75,
    isVisible: true,
  },
  {
    name: 'Goospery Ring',
    id: 76,
    isVisible: true,
  },
  {
    name: 'Honeycomb',
    id: 77,
    isVisible: true,
  },
  {
    name: 'FIBRA',
    id: 78,
    isVisible: true,
  },
  {
    name: 'Mechanic',
    id: 79,
    isVisible: true,
  },
  {
    name: 'Relife',
    id: 80,
    isVisible: true,
  },
  {
    name: 'OCA',
    id: 81,
    isVisible: true,
  },
  {
    name: 'Goodram',
    id: 82,
    isVisible: true,
  },
  {
    name: 'Kowski',
    id: 83,
    isVisible: true,
  },
  {
    name: 'Baku',
    id: 84,
    isVisible: true,
  },
  {
    name: 'Charger Doctor',
    id: 85,
    isVisible: true,
  },
  {
    name: 'Dazheng',
    id: 86,
    isVisible: true,
  },
  {
    name: 'Kada',
    id: 87,
    isVisible: true,
  },
  {
    name: 'WEP',
    id: 88,
    isVisible: true,
  },
  {
    name: 'Zhaoxin',
    id: 89,
    isVisible: true,
  },
  {
    name: 'Kaisi',
    id: 90,
    isVisible: true,
  },
  {
    name: 'QianLi',
    id: 91,
    isVisible: true,
  },
  {
    name: 'ZiS',
    id: 93,
    isVisible: true,
  },
  {
    name: 'Kawh',
    id: 94,
    isVisible: true,
  },
  {
    name: 'Wasp',
    id: 95,
    isVisible: true,
  },
  {
    name: 'XT',
    id: 96,
    isVisible: true,
  },
  {
    name: 'Mastech',
    id: 97,
    isVisible: true,
  },
  {
    name: 'Amaoe Strong',
    id: 99,
    isVisible: true,
  },
  {
    name: 'Goot Wick',
    id: 100,
    isVisible: true,
  },
  {
    name: "Pro'sKit",
    id: 101,
    isVisible: true,
  },
  {
    name: 'MicroView',
    id: 102,
    isVisible: true,
  },
  {
    name: 'Amaoe',
    id: 103,
    isVisible: true,
  },
  {
    name: 'Wylie',
    id: 104,
    isVisible: true,
  },
  {
    name: 'Aifen',
    id: 105,
    isVisible: true,
  },
  {
    name: 'Achi',
    id: 106,
    isVisible: true,
  },
  {
    name: 'Lukey',
    id: 107,
    isVisible: true,
  },
  {
    name: 'Quick',
    id: 108,
    isVisible: true,
  },
  {
    name: 'Scotle',
    id: 109,
    isVisible: true,
  },
  {
    name: 'Sugon',
    id: 110,
    isVisible: true,
  },
  {
    name: 'Tornado',
    id: 111,
    isVisible: true,
  },
  {
    name: 'Aoyue',
    id: 112,
    isVisible: true,
  },
  {
    name: 'Amtech',
    id: 113,
    isVisible: true,
  },
  {
    name: 'Halnziye',
    id: 114,
    isVisible: true,
  },
  {
    name: 'JYD',
    id: 115,
    isVisible: true,
  },
  {
    name: 'Kailiwei',
    id: 116,
    isVisible: true,
  },
  {
    name: 'M-Triangel',
    id: 117,
    isVisible: true,
  },
  {
    name: 'PUR',
    id: 118,
    isVisible: true,
  },
  {
    name: '3M',
    id: 119,
    isVisible: true,
  },
  {
    name: 'VGT',
    id: 120,
    isVisible: true,
  },
];

const brandsToCategories = [
  {
    categoryId: 2,
    brandId: 2,
  },
  {
    categoryId: 2,
    brandId: 3,
  },
  {
    categoryId: 3,
    brandId: 3,
  },
  {
    categoryId: 3,
    brandId: 2,
  },
  {
    categoryId: 4,
    brandId: 1,
  },
  {
    categoryId: 5,
    brandId: 2,
  },
  {
    categoryId: 5,
    brandId: 4,
  },
  {
    categoryId: 5,
    brandId: 5,
  },
  {
    categoryId: 5,
    brandId: 1,
  },
  {
    categoryId: 5,
    brandId: 6,
  },
  {
    categoryId: 6,
    brandId: 7,
  },
  {
    categoryId: 6,
    brandId: 8,
  },
  {
    categoryId: 6,
    brandId: 9,
  },
  {
    categoryId: 6,
    brandId: 10,
  },
  {
    categoryId: 6,
    brandId: 11,
  },
  {
    categoryId: 6,
    brandId: 12,
  },
  {
    categoryId: 6,
    brandId: 13,
  },
  {
    categoryId: 6,
    brandId: 15,
  },
  {
    categoryId: 6,
    brandId: 14,
  },
  {
    categoryId: 6,
    brandId: 16,
  },
  {
    categoryId: 6,
    brandId: 17,
  },
  {
    categoryId: 6,
    brandId: 18,
  },
  {
    categoryId: 6,
    brandId: 19,
  },
  {
    categoryId: 6,
    brandId: 20,
  },
  {
    categoryId: 6,
    brandId: 21,
  },
  {
    categoryId: 6,
    brandId: 22,
  },
  {
    categoryId: 6,
    brandId: 23,
  },
  {
    categoryId: 6,
    brandId: 24,
  },
  {
    categoryId: 6,
    brandId: 25,
  },
  {
    categoryId: 6,
    brandId: 3,
  },
  {
    categoryId: 6,
    brandId: 2,
  },
  {
    categoryId: 7,
    brandId: 1,
  },
  {
    categoryId: 7,
    brandId: 2,
  },
  {
    categoryId: 7,
    brandId: 26,
  },
  {
    categoryId: 2,
    brandId: 4,
  },
  {
    categoryId: 2,
    brandId: 27,
  },
  {
    categoryId: 4,
    brandId: 4,
  },
  {
    categoryId: 4,
    brandId: 27,
  },
  {
    categoryId: 3,
    brandId: 4,
  },
  {
    categoryId: 5,
    brandId: 3,
  },
  {
    categoryId: 8,
    brandId: 3,
  },
  {
    categoryId: 8,
    brandId: 2,
  },
  {
    categoryId: 9,
    brandId: 3,
  },
  {
    categoryId: 9,
    brandId: 2,
  },
  {
    categoryId: 9,
    brandId: 24,
  },
  {
    categoryId: 7,
    brandId: 4,
  },
  {
    categoryId: 7,
    brandId: 3,
  },
  {
    categoryId: 7,
    brandId: 28,
  },
  {
    categoryId: 7,
    brandId: 27,
  },
  {
    categoryId: 10,
    brandId: 2,
  },
  {
    categoryId: 7,
    brandId: 29,
  },
  {
    categoryId: 11,
    brandId: 30,
  },
  {
    categoryId: 11,
    brandId: 31,
  },
  {
    categoryId: 12,
    brandId: 32,
  },
  {
    categoryId: 12,
    brandId: 24,
  },
  {
    categoryId: 13,
    brandId: 3,
  },
  {
    categoryId: 13,
    brandId: 2,
  },
  {
    categoryId: 13,
    brandId: 27,
  },
  {
    categoryId: 13,
    brandId: 24,
  },
  {
    categoryId: 14,
    brandId: 2,
  },
  {
    categoryId: 14,
    brandId: 33,
  },
  {
    categoryId: 14,
    brandId: 24,
  },
  {
    categoryId: 15,
    brandId: 1,
  },
  {
    categoryId: 15,
    brandId: 34,
  },
  {
    categoryId: 15,
    brandId: 35,
  },
  {
    categoryId: 15,
    brandId: 2,
  },
  {
    categoryId: 15,
    brandId: 36,
  },
  {
    categoryId: 15,
    brandId: 37,
  },
  {
    categoryId: 15,
    brandId: 38,
  },
  {
    categoryId: 15,
    brandId: 39,
  },
  {
    categoryId: 15,
    brandId: 40,
  },
  {
    categoryId: 15,
    brandId: 41,
  },
  {
    categoryId: 16,
    brandId: 42,
  },
  {
    categoryId: 16,
    brandId: 44,
  },
  {
    categoryId: 9,
    brandId: 43,
  },
  {
    categoryId: 9,
    brandId: 1,
  },
  {
    categoryId: 9,
    brandId: 7,
  },
  {
    categoryId: 9,
    brandId: 4,
  },
  {
    categoryId: 9,
    brandId: 45,
  },
  {
    categoryId: 9,
    brandId: 20,
  },
  {
    categoryId: 9,
    brandId: 46,
  },
  {
    categoryId: 17,
    brandId: 1,
  },
  {
    categoryId: 17,
    brandId: 47,
  },
  {
    categoryId: 17,
    brandId: 48,
  },
  {
    categoryId: 17,
    brandId: 49,
  },
  {
    categoryId: 17,
    brandId: 50,
  },
  {
    categoryId: 17,
    brandId: 51,
  },
  {
    categoryId: 17,
    brandId: 52,
  },
  {
    categoryId: 17,
    brandId: 3,
  },
  {
    categoryId: 17,
    brandId: 53,
  },
  {
    categoryId: 17,
    brandId: 2,
  },
  {
    categoryId: 17,
    brandId: 54,
  },
  {
    categoryId: 17,
    brandId: 55,
  },
  {
    categoryId: 17,
    brandId: 57,
  },
  {
    categoryId: 8,
    brandId: 46,
  },
  {
    categoryId: 2,
    brandId: 1,
  },
  {
    categoryId: 18,
    brandId: 24,
  },
  {
    categoryId: 18,
    brandId: 58,
  },
  {
    categoryId: 19,
    brandId: 1,
  },
  {
    categoryId: 4,
    brandId: 3,
  },
  {
    categoryId: 18,
    brandId: 3,
  },
  {
    categoryId: 20,
    brandId: 1,
  },
  {
    categoryId: 1,
    brandId: 1,
  },
  {
    categoryId: 21,
    brandId: 1,
  },
  {
    categoryId: 22,
    brandId: 1,
  },
  {
    categoryId: 20,
    brandId: 24,
  },
  {
    categoryId: 7,
    brandId: 6,
  },
  {
    categoryId: 7,
    brandId: 7,
  },
  {
    categoryId: 7,
    brandId: 45,
  },
  {
    categoryId: 7,
    brandId: 59,
  },
  {
    categoryId: 23,
    brandId: 1,
  },
  {
    categoryId: 23,
    brandId: 62,
  },
  {
    categoryId: 23,
    brandId: 63,
  },
  {
    categoryId: 23,
    brandId: 64,
  },
  {
    categoryId: 23,
    brandId: 46,
  },
  {
    categoryId: 23,
    brandId: 2,
  },
  {
    categoryId: 23,
    brandId: 60,
  },
  {
    categoryId: 23,
    brandId: 30,
  },
  {
    categoryId: 23,
    brandId: 20,
  },
  {
    categoryId: 10,
    brandId: 1,
  },
  {
    categoryId: 10,
    brandId: 3,
  },
  {
    categoryId: 10,
    brandId: 8,
  },
  {
    categoryId: 10,
    brandId: 6,
  },
  {
    categoryId: 24,
    brandId: 1,
  },
  {
    categoryId: 24,
    brandId: 3,
  },
  {
    categoryId: 24,
    brandId: 2,
  },
  {
    categoryId: 25,
    brandId: 1,
  },
  {
    categoryId: 21,
    brandId: 2,
  },
  {
    categoryId: 12,
    brandId: 68,
  },
  {
    categoryId: 12,
    brandId: 2,
  },
  {
    categoryId: 12,
    brandId: 3,
  },
  {
    categoryId: 12,
    brandId: 1,
  },
  {
    categoryId: 12,
    brandId: 65,
  },
  {
    categoryId: 12,
    brandId: 66,
  },
  {
    categoryId: 12,
    brandId: 69,
  },
  {
    categoryId: 12,
    brandId: 12,
  },
  {
    categoryId: 12,
    brandId: 67,
  },
  {
    categoryId: 12,
    brandId: 70,
  },
  {
    categoryId: 26,
    brandId: 7,
  },
  {
    categoryId: 26,
    brandId: 71,
  },
  {
    categoryId: 26,
    brandId: 10,
  },
  {
    categoryId: 26,
    brandId: 12,
  },
  {
    categoryId: 26,
    brandId: 13,
  },
  {
    categoryId: 26,
    brandId: 14,
  },
  {
    categoryId: 26,
    brandId: 15,
  },
  {
    categoryId: 26,
    brandId: 16,
  },
  {
    categoryId: 26,
    brandId: 17,
  },
  {
    categoryId: 26,
    brandId: 18,
  },
  {
    categoryId: 26,
    brandId: 19,
  },
  {
    categoryId: 26,
    brandId: 20,
  },
  {
    categoryId: 26,
    brandId: 21,
  },
  {
    categoryId: 26,
    brandId: 23,
  },
  {
    categoryId: 26,
    brandId: 24,
  },
  {
    categoryId: 13,
    brandId: 1,
  },
  {
    categoryId: 14,
    brandId: 1,
  },
  {
    categoryId: 19,
    brandId: 6,
  },
  {
    categoryId: 19,
    brandId: 46,
  },
  {
    categoryId: 14,
    brandId: 3,
  },
  {
    categoryId: 27,
    brandId: 1,
  },
  {
    categoryId: 27,
    brandId: 72,
  },
  {
    categoryId: 27,
    brandId: 73,
  },
  {
    categoryId: 27,
    brandId: 74,
  },
  {
    categoryId: 27,
    brandId: 75,
  },
  {
    categoryId: 27,
    brandId: 76,
  },
  {
    categoryId: 27,
    brandId: 77,
  },
  {
    categoryId: 27,
    brandId: 78,
  },
  {
    categoryId: 28,
    brandId: 1,
  },
  {
    categoryId: 28,
    brandId: 42,
  },
  {
    categoryId: 28,
    brandId: 79,
  },
  {
    categoryId: 28,
    brandId: 80,
  },
  {
    categoryId: 29,
    brandId: 1,
  },
  {
    categoryId: 30,
    brandId: 1,
  },
  {
    categoryId: 31,
    brandId: 1,
  },
  {
    categoryId: 26,
    brandId: 1,
  },
  {
    categoryId: 32,
    brandId: 1,
  },
  {
    categoryId: 33,
    brandId: 1,
  },
  {
    categoryId: 28,
    brandId: 81,
  },
  {
    categoryId: 34,
    brandId: 1,
  },
  {
    categoryId: 35,
    brandId: 1,
  },
  {
    categoryId: 36,
    brandId: 1,
  },
  {
    categoryId: 38,
    brandId: 1,
  },
  {
    categoryId: 39,
    brandId: 1,
  },
  {
    categoryId: 40,
    brandId: 1,
  },
  {
    categoryId: 41,
    brandId: 1,
  },
  {
    categoryId: 42,
    brandId: 1,
  },
  {
    categoryId: 43,
    brandId: 60,
  },
  {
    categoryId: 43,
    brandId: 82,
  },
  {
    categoryId: 44,
    brandId: 1,
  },
  {
    categoryId: 45,
    brandId: 1,
  },
  {
    categoryId: 46,
    brandId: 1,
  },
  {
    categoryId: 47,
    brandId: 1,
  },
  {
    categoryId: 48,
    brandId: 3,
  },
  {
    categoryId: 49,
    brandId: 1,
  },
  {
    categoryId: 50,
    brandId: 1,
  },
  {
    categoryId: 51,
    brandId: 85,
  },
  {
    categoryId: 51,
    brandId: 83,
  },
  {
    categoryId: 51,
    brandId: 43,
  },
  {
    categoryId: 51,
    brandId: 42,
  },
  {
    categoryId: 51,
    brandId: 84,
  },
  {
    categoryId: 51,
    brandId: 86,
  },
  {
    categoryId: 51,
    brandId: 87,
  },
  {
    categoryId: 51,
    brandId: 88,
  },
  {
    categoryId: 51,
    brandId: 89,
  },
  {
    categoryId: 51,
    brandId: 1,
  },
  {
    categoryId: 52,
    brandId: 42,
  },
  {
    categoryId: 52,
    brandId: 1,
  },
  {
    categoryId: 52,
    brandId: 87,
  },
  {
    categoryId: 53,
    brandId: 90,
  },
  {
    categoryId: 53,
    brandId: 91,
  },
  {
    categoryId: 53,
    brandId: 84,
  },
  {
    categoryId: 53,
    brandId: 80,
  },
  {
    categoryId: 53,
    brandId: 43,
  },
  {
    categoryId: 53,
    brandId: 93,
  },
  {
    categoryId: 53,
    brandId: 1,
  },
  {
    categoryId: 54,
    brandId: 42,
  },
  {
    categoryId: 55,
    brandId: 1,
  },
  {
    categoryId: 55,
    brandId: 84,
  },
  {
    categoryId: 55,
    brandId: 79,
  },
  {
    categoryId: 55,
    brandId: 42,
  },
  {
    categoryId: 55,
    brandId: 80,
  },
  {
    categoryId: 57,
    brandId: 84,
  },
  {
    categoryId: 57,
    brandId: 1,
  },
  {
    categoryId: 57,
    brandId: 42,
  },
  {
    categoryId: 57,
    brandId: 79,
  },
  {
    categoryId: 56,
    brandId: 1,
  },
  {
    categoryId: 58,
    brandId: 1,
  },
  {
    categoryId: 58,
    brandId: 84,
  },
  {
    categoryId: 59,
    brandId: 42,
  },
  {
    categoryId: 59,
    brandId: 79,
  },
  {
    categoryId: 60,
    brandId: 1,
  },
  {
    categoryId: 60,
    brandId: 79,
  },
  {
    categoryId: 60,
    brandId: 42,
  },
  {
    categoryId: 60,
    brandId: 84,
  },
  {
    categoryId: 60,
    brandId: 94,
  },
  {
    categoryId: 60,
    brandId: 95,
  },
  {
    categoryId: 60,
    brandId: 96,
  },
  {
    categoryId: 60,
    brandId: 101,
  },
  {
    categoryId: 61,
    brandId: 42,
  },
  {
    categoryId: 61,
    brandId: 1,
  },
  {
    categoryId: 61,
    brandId: 84,
  },
  {
    categoryId: 61,
    brandId: 80,
  },
  {
    categoryId: 61,
    brandId: 97,
  },
  {
    categoryId: 76,
    brandId: 84,
  },
  {
    categoryId: 76,
    brandId: 99,
  },
  {
    categoryId: 76,
    brandId: 100,
  },
  {
    categoryId: 76,
    brandId: 43,
  },
  {
    categoryId: 62,
    brandId: 101,
  },
  {
    categoryId: 62,
    brandId: 1,
  },
  {
    categoryId: 62,
    brandId: 42,
  },
  {
    categoryId: 62,
    brandId: 102,
  },
  {
    categoryId: 63,
    brandId: 103,
  },
  {
    categoryId: 63,
    brandId: 79,
  },
  {
    categoryId: 63,
    brandId: 1,
  },
  {
    categoryId: 63,
    brandId: 104,
  },
  {
    categoryId: 64,
    brandId: 42,
  },
  {
    categoryId: 64,
    brandId: 103,
  },
  {
    categoryId: 64,
    brandId: 84,
  },
  {
    categoryId: 64,
    brandId: 1,
  },
  {
    categoryId: 65,
    brandId: 106,
  },
  {
    categoryId: 65,
    brandId: 105,
  },
  {
    categoryId: 65,
    brandId: 84,
  },
  {
    categoryId: 65,
    brandId: 87,
  },
  {
    categoryId: 65,
    brandId: 42,
  },
  {
    categoryId: 65,
    brandId: 107,
  },
  {
    categoryId: 65,
    brandId: 108,
  },
  {
    categoryId: 65,
    brandId: 80,
  },
  {
    categoryId: 65,
    brandId: 109,
  },
  {
    categoryId: 65,
    brandId: 110,
  },
  {
    categoryId: 65,
    brandId: 111,
  },
  {
    categoryId: 65,
    brandId: 88,
  },
  {
    categoryId: 66,
    brandId: 42,
  },
  {
    categoryId: 66,
    brandId: 112,
  },
  {
    categoryId: 66,
    brandId: 84,
  },
  {
    categoryId: 66,
    brandId: 107,
  },
  {
    categoryId: 67,
    brandId: 84,
  },
  {
    categoryId: 67,
    brandId: 42,
  },
  {
    categoryId: 67,
    brandId: 1,
  },
  {
    categoryId: 67,
    brandId: 103,
  },
  {
    categoryId: 69,
    brandId: 114,
  },
  {
    categoryId: 68,
    brandId: 84,
  },
  {
    categoryId: 68,
    brandId: 79,
  },
  {
    categoryId: 68,
    brandId: 1,
  },
  {
    categoryId: 68,
    brandId: 113,
  },
  {
    categoryId: 68,
    brandId: 103,
  },
  {
    categoryId: 68,
    brandId: 80,
  },
  {
    categoryId: 70,
    brandId: 1,
  },
  {
    categoryId: 71,
    brandId: 1,
  },
  {
    categoryId: 71,
    brandId: 42,
  },
  {
    categoryId: 71,
    brandId: 115,
  },
  {
    categoryId: 71,
    brandId: 116,
  },
  {
    categoryId: 71,
    brandId: 117,
  },
  {
    categoryId: 71,
    brandId: 43,
  },
  {
    categoryId: 72,
    brandId: 42,
  },
  {
    categoryId: 72,
    brandId: 1,
  },
  {
    categoryId: 28,
    brandId: 118,
  },
  {
    categoryId: 28,
    brandId: 43,
  },
  {
    categoryId: 73,
    brandId: 119,
  },
  {
    categoryId: 73,
    brandId: 103,
  },
  {
    categoryId: 73,
    brandId: 1,
  },
  {
    categoryId: 74,
    brandId: 1,
  },
  {
    categoryId: 75,
    brandId: 120,
  },
];

export async function createBrands() {
  const brandsToUpload = brands.map(br => {
    const categoriesByBrands = brandsToCategories
      .filter(brCat => brCat.brandId === br.id)
      .map(cat => cat.categoryId);

    return {
      id: br.id,
      name: br.name,
      categories: categoriesByBrands,
      isVisible: br.isVisible,
    };
  });

  for (const brand of brandsToUpload) {
    await prisma.brand.upsert({
      where: {
        id: brand.id,
      },
      update: {
        name: brand.name,
      },
      create: {
        id: brand.id,
        name: brand.name,
        isVisible: brand.isVisible,
        category: {
          connect: brand.categories.map(br => ({ id: br })),
        },
      },
    });
  }
}

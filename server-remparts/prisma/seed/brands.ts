import { prisma } from '../prisma';

const brands = [
  {
    name: 'Unbranded',
    id: 1,
  },
  {
    name: 'Hoco',
    id: 2,
  },
  {
    name: 'Borofone',
    id: 3,
  },
  {
    name: 'Baseus',
    id: 4,
  },
  {
    name: 'Golf',
    id: 5,
  },
  {
    name: 'Remax',
    id: 6,
  },
  {
    name: 'Apple',
    id: 7,
  },
  {
    name: 'JBL',
    id: 8,
  },
  {
    name: 'Google',
    id: 9,
  },
  {
    name: 'Huawei / Honor',
    id: 10,
  },
  {
    name: 'Infinix',
    id: 11,
  },
  {
    name: 'Lenovo',
    id: 12,
  },
  {
    name: 'LG',
    id: 13,
  },
  {
    name: 'Meizu',
    id: 14,
  },
  {
    name: 'Motorola',
    id: 15,
  },
  {
    name: 'Nokia / Microsoft',
    id: 16,
  },
  {
    name: 'OnePlus',
    id: 17,
  },
  {
    name: 'Oppo',
    id: 18,
  },
  {
    name: 'Realme',
    id: 19,
  },
  {
    name: 'Samsung',
    id: 20,
  },
  {
    name: 'Tecno',
    id: 21,
  },
  {
    name: 'TP-Link',
    id: 22,
  },
  {
    name: 'Vivo',
    id: 23,
  },
  {
    name: 'Xiaomi',
    id: 24,
  },
  {
    name: 'ZTE',
    id: 25,
  },
  {
    name: 'Essager',
    id: 26,
  },
  {
    name: 'Usams',
    id: 27,
  },
  {
    name: 'Mibrand',
    id: 28,
  },
  {
    name: 'Ugreen',
    id: 29,
  },
  {
    name: 'ADATA',
    id: 30,
  },
  {
    name: 'XPG',
    id: 31,
  },
  {
    name: 'Wiwu',
    id: 32,
  },
  {
    name: 'Howear',
    id: 33,
  },
  {
    name: 'Duracell',
    id: 34,
  },
  {
    name: 'GP',
    id: 35,
  },
  {
    name: 'LogicPower',
    id: 36,
  },
  {
    name: 'PkCell',
    id: 37,
  },
  {
    name: 'Sony',
    id: 38,
  },
  {
    name: 'UFO',
    id: 39,
  },
  {
    name: 'Videx',
    id: 40,
  },
  {
    name: 'Varta',
    id: 41,
  },
  {
    name: 'Aida',
    id: 42,
  },
  {
    name: 'Sunshine',
    id: 43,
  },
  {
    name: 'Keweisi',
    id: 44,
  },
  {
    name: 'Ridea',
    id: 45,
  },
  {
    name: 'XO',
    id: 46,
  },
  {
    name: '6D King Fire',
    id: 47,
  },
  {
    name: 'Full Glue',
    id: 48,
  },
  {
    name: 'Super G',
    id: 49,
  },
  {
    name: '2.5D',
    id: 50,
  },
  {
    name: '6D OG Crown',
    id: 51,
  },
  {
    name: '6D Angel',
    id: 52,
  },
  {
    name: 'GA Violet',
    id: 53,
  },
  {
    name: 'GA OG Privacy',
    id: 54,
  },
  {
    name: 'OG',
    id: 55,
  },
  {
    name: '9D',
    id: 57,
  },
  {
    name: 'Yosee',
    id: 58,
  },
  {
    name: 'iVON',
    id: 59,
  },
  {
    name: 'Kingston',
    id: 60,
  },
  {
    name: 'Team',
    id: 62,
  },
  {
    name: 'Apacer',
    id: 63,
  },
  {
    name: 'Crown',
    id: 64,
  },
  {
    name: 'Dell',
    id: 65,
  },
  {
    name: 'Gembird',
    id: 66,
  },
  {
    name: 'Logitech',
    id: 67,
  },
  {
    name: 'Fantech',
    id: 68,
  },
  {
    name: 'Havic',
    id: 69,
  },
  {
    name: 'HP',
    id: 70,
  },
  {
    name: 'Asus',
    id: 71,
  },
  {
    name: 'Krystal Magsafe',
    id: 72,
  },
  {
    name: 'Silicone Case',
    id: 73,
  },
  {
    name: 'TPU',
    id: 74,
  },
  {
    name: 'Carbon Protect',
    id: 75,
  },
  {
    name: 'Goospery Ring',
    id: 76,
  },
  {
    name: 'Honeycomb',
    id: 77,
  },
  {
    name: 'FIBRA',
    id: 78,
  },
  {
    name: 'Mechanic',
    id: 79,
  },
  {
    name: 'Relife',
    id: 80,
  },
  {
    name: 'OCA',
    id: 81,
  },
  {
    name: 'Goodram',
    id: 82,
  },
  {
    name: 'Kowski',
    id: 83,
  },
  {
    name: 'Baku',
    id: 84,
  },
  {
    name: 'Charger Doctor',
    id: 85,
  },
  {
    name: 'Dazheng',
    id: 86,
  },
  {
    name: 'Kada',
    id: 87,
  },
  {
    name: 'WEP',
    id: 88,
  },
  {
    name: 'Zhaoxin',
    id: 89,
  },
  {
    name: 'Kaisi',
    id: 90,
  },
  {
    name: 'QianLi',
    id: 91,
  },
  {
    name: 'ZiS',
    id: 93,
  },
  {
    name: 'Kawh',
    id: 94,
  },
  {
    name: 'Wasp',
    id: 95,
  },
  {
    name: 'XT',
    id: 96,
  },
  {
    name: 'Mastech',
    id: 97,
  },

  {
    name: 'Amaoe Strong',
    id: 99,
  },
  {
    name: 'Goot Wick',
    id: 100,
  },
  {
    name: "Pro'sKit",
    id: 101,
  },
  {
    name: 'MicroView',
    id: 102,
  },
  {
    name: 'Amaoe',
    id: 103,
  },
  {
    name: 'Wylie',
    id: 104,
  },
  {
    name: 'Aifen',
    id: 105,
  },
  {
    name: 'Achi',
    id: 106,
  },
  {
    name: 'Lukey',
    id: 107,
  },
  {
    name: 'Quick',
    id: 108,
  },
  {
    name: 'Scotle',
    id: 109,
  },
  {
    name: 'Sugon',
    id: 110,
  },
  {
    name: 'Tornado',
    id: 111,
  },
  {
    name: 'Aoyue',
    id: 112,
  },
  {
    name: 'Amtech',
    id: 113,
  },
  {
    name: 'Halnziye',
    id: 114,
  },
  {
    name: 'JYD',
    id: 115,
  },
  {
    name: 'Kailiwei',
    id: 116,
  },
  {
    name: 'M-Triangel',
    id: 117,
  },
  {
    name: 'PUR',
    id: 118,
  },
  {
    name: '3M',
    id: 119,
  },
  {
    name: 'VGT',
    id: 120,
  },
  {
    name: 'PUR',
    id: 118,
  },
  {
    name: '3M',
    id: 119,
  },
  {
    name: 'VGT',
    id: 120,
  },
];

const brandsToCategories = [
  {
    categoryId: 1,
    brandId: 2,
  },
  {
    categoryId: 1,
    brandId: 3,
  },
  {
    categoryId: 2,
    brandId: 3,
  },
  {
    categoryId: 2,
    brandId: 2,
  },
  {
    categoryId: 3,
    brandId: 1,
  },
  {
    categoryId: 4,
    brandId: 2,
  },
  {
    categoryId: 4,
    brandId: 4,
  },
  {
    categoryId: 4,
    brandId: 5,
  },
  {
    categoryId: 4,
    brandId: 1,
  },
  {
    categoryId: 4,
    brandId: 6,
  },
  {
    categoryId: 5,
    brandId: 7,
  },
  {
    categoryId: 5,
    brandId: 8,
  },
  {
    categoryId: 5,
    brandId: 9,
  },
  {
    categoryId: 5,
    brandId: 10,
  },
  {
    categoryId: 5,
    brandId: 11,
  },
  {
    categoryId: 5,
    brandId: 12,
  },
  {
    categoryId: 5,
    brandId: 13,
  },
  {
    categoryId: 5,
    brandId: 15,
  },
  {
    categoryId: 5,
    brandId: 14,
  },
  {
    categoryId: 5,
    brandId: 16,
  },
  {
    categoryId: 5,
    brandId: 17,
  },
  {
    categoryId: 5,
    brandId: 18,
  },
  {
    categoryId: 5,
    brandId: 19,
  },
  {
    categoryId: 5,
    brandId: 20,
  },
  {
    categoryId: 5,
    brandId: 21,
  },
  {
    categoryId: 5,
    brandId: 22,
  },
  {
    categoryId: 5,
    brandId: 23,
  },
  {
    categoryId: 5,
    brandId: 24,
  },
  {
    categoryId: 5,
    brandId: 25,
  },
  {
    categoryId: 5,
    brandId: 3,
  },
  {
    categoryId: 5,
    brandId: 2,
  },
  {
    categoryId: 6,
    brandId: 1,
  },
  {
    categoryId: 6,
    brandId: 2,
  },
  {
    categoryId: 6,
    brandId: 26,
  },
  {
    categoryId: 1,
    brandId: 4,
  },
  {
    categoryId: 1,
    brandId: 27,
  },
  {
    categoryId: 3,
    brandId: 4,
  },
  {
    categoryId: 3,
    brandId: 27,
  },
  {
    categoryId: 2,
    brandId: 4,
  },
  {
    categoryId: 4,
    brandId: 3,
  },
  {
    categoryId: 7,
    brandId: 3,
  },
  {
    categoryId: 7,
    brandId: 2,
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
    categoryId: 8,
    brandId: 24,
  },
  {
    categoryId: 6,
    brandId: 4,
  },
  {
    categoryId: 6,
    brandId: 3,
  },
  {
    categoryId: 6,
    brandId: 28,
  },
  {
    categoryId: 6,
    brandId: 27,
  },
  {
    categoryId: 9,
    brandId: 2,
  },
  {
    categoryId: 6,
    brandId: 29,
  },
  {
    categoryId: 10,
    brandId: 61,
  },
  {
    categoryId: 10,
    brandId: 31,
  },
  {
    categoryId: 11,
    brandId: 32,
  },
  {
    categoryId: 11,
    brandId: 24,
  },
  {
    categoryId: 12,
    brandId: 3,
  },
  {
    categoryId: 12,
    brandId: 2,
  },
  {
    categoryId: 12,
    brandId: 27,
  },
  {
    categoryId: 12,
    brandId: 24,
  },
  {
    categoryId: 13,
    brandId: 2,
  },
  {
    categoryId: 13,
    brandId: 33,
  },
  {
    categoryId: 13,
    brandId: 24,
  },
  {
    categoryId: 14,
    brandId: 1,
  },
  {
    categoryId: 14,
    brandId: 34,
  },
  {
    categoryId: 14,
    brandId: 35,
  },
  {
    categoryId: 14,
    brandId: 2,
  },
  {
    categoryId: 14,
    brandId: 36,
  },
  {
    categoryId: 14,
    brandId: 37,
  },
  {
    categoryId: 14,
    brandId: 38,
  },
  {
    categoryId: 14,
    brandId: 39,
  },
  {
    categoryId: 14,
    brandId: 40,
  },
  {
    categoryId: 14,
    brandId: 41,
  },
  {
    categoryId: 15,
    brandId: 42,
  },
  {
    categoryId: 15,
    brandId: 44,
  },
  {
    categoryId: 8,
    brandId: 43,
  },
  {
    categoryId: 8,
    brandId: 1,
  },
  {
    categoryId: 8,
    brandId: 7,
  },
  {
    categoryId: 8,
    brandId: 4,
  },
  {
    categoryId: 8,
    brandId: 45,
  },
  {
    categoryId: 8,
    brandId: 20,
  },
  {
    categoryId: 8,
    brandId: 46,
  },
  {
    categoryId: 16,
    brandId: 1,
  },
  {
    categoryId: 16,
    brandId: 47,
  },
  {
    categoryId: 16,
    brandId: 48,
  },
  {
    categoryId: 16,
    brandId: 49,
  },
  {
    categoryId: 16,
    brandId: 50,
  },
  {
    categoryId: 16,
    brandId: 51,
  },
  {
    categoryId: 16,
    brandId: 52,
  },
  {
    categoryId: 16,
    brandId: 3,
  },
  {
    categoryId: 16,
    brandId: 53,
  },
  {
    categoryId: 16,
    brandId: 2,
  },
  {
    categoryId: 16,
    brandId: 54,
  },
  {
    categoryId: 16,
    brandId: 55,
  },
  {
    categoryId: 16,
    brandId: 57,
  },
  {
    categoryId: 7,
    brandId: 46,
  },
  {
    categoryId: 1,
    brandId: 1,
  },
  {
    categoryId: 17,
    brandId: 24,
  },
  {
    categoryId: 17,
    brandId: 58,
  },
  {
    categoryId: 18,
    brandId: 1,
  },
  {
    categoryId: 3,
    brandId: 3,
  },
  {
    categoryId: 17,
    brandId: 3,
  },
  {
    categoryId: 19,
    brandId: 1,
  },
  {
    categoryId: 20,
    brandId: 1,
  },
  {
    categoryId: 21,
    brandId: 1,
  },
  {
    categoryId: 19,
    brandId: 24,
  },
  {
    categoryId: 6,
    brandId: 6,
  },
  {
    categoryId: 6,
    brandId: 7,
  },
  {
    categoryId: 6,
    brandId: 45,
  },
  {
    categoryId: 6,
    brandId: 59,
  },
  {
    categoryId: 22,
    brandId: 1,
  },
  {
    categoryId: 22,
    brandId: 62,
  },
  {
    categoryId: 22,
    brandId: 63,
  },
  {
    categoryId: 22,
    brandId: 64,
  },
  {
    categoryId: 22,
    brandId: 46,
  },
  {
    categoryId: 22,
    brandId: 2,
  },
  {
    categoryId: 22,
    brandId: 60,
  },
  {
    categoryId: 22,
    brandId: 61,
  },
  {
    categoryId: 22,
    brandId: 20,
  },
  {
    categoryId: 9,
    brandId: 1,
  },
  {
    categoryId: 9,
    brandId: 3,
  },
  {
    categoryId: 9,
    brandId: 8,
  },
  {
    categoryId: 9,
    brandId: 6,
  },
  {
    categoryId: 23,
    brandId: 1,
  },
  {
    categoryId: 23,
    brandId: 3,
  },
  {
    categoryId: 23,
    brandId: 2,
  },
  {
    categoryId: 24,
    brandId: 1,
  },
  {
    categoryId: 20,
    brandId: 2,
  },
  {
    categoryId: 11,
    brandId: 68,
  },
  {
    categoryId: 11,
    brandId: 2,
  },
  {
    categoryId: 11,
    brandId: 3,
  },
  {
    categoryId: 11,
    brandId: 1,
  },
  {
    categoryId: 11,
    brandId: 65,
  },
  {
    categoryId: 11,
    brandId: 66,
  },
  {
    categoryId: 11,
    brandId: 69,
  },
  {
    categoryId: 11,
    brandId: 12,
  },
  {
    categoryId: 11,
    brandId: 67,
  },
  {
    categoryId: 11,
    brandId: 70,
  },
  {
    categoryId: 25,
    brandId: 7,
  },
  {
    categoryId: 25,
    brandId: 71,
  },
  {
    categoryId: 25,
    brandId: 10,
  },
  {
    categoryId: 25,
    brandId: 12,
  },
  {
    categoryId: 25,
    brandId: 13,
  },
  {
    categoryId: 25,
    brandId: 14,
  },
  {
    categoryId: 25,
    brandId: 15,
  },
  {
    categoryId: 25,
    brandId: 16,
  },
  {
    categoryId: 25,
    brandId: 17,
  },
  {
    categoryId: 25,
    brandId: 18,
  },
  {
    categoryId: 25,
    brandId: 19,
  },
  {
    categoryId: 25,
    brandId: 20,
  },
  {
    categoryId: 25,
    brandId: 21,
  },
  {
    categoryId: 25,
    brandId: 23,
  },
  {
    categoryId: 25,
    brandId: 24,
  },
  {
    categoryId: 12,
    brandId: 1,
  },
  {
    categoryId: 13,
    brandId: 1,
  },
  {
    categoryId: 18,
    brandId: 6,
  },
  {
    categoryId: 18,
    brandId: 46,
  },
  {
    categoryId: 13,
    brandId: 3,
  },
  {
    categoryId: 26,
    brandId: 1,
  },
  {
    categoryId: 26,
    brandId: 72,
  },
  {
    categoryId: 26,
    brandId: 73,
  },
  {
    categoryId: 26,
    brandId: 74,
  },
  {
    categoryId: 26,
    brandId: 75,
  },
  {
    categoryId: 26,
    brandId: 76,
  },
  {
    categoryId: 26,
    brandId: 77,
  },
  {
    categoryId: 26,
    brandId: 78,
  },
  {
    categoryId: 27,
    brandId: 1,
  },
  {
    categoryId: 27,
    brandId: 42,
  },
  {
    categoryId: 27,
    brandId: 79,
  },
  {
    categoryId: 27,
    brandId: 80,
  },
  {
    categoryId: 28,
    brandId: 1,
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
    categoryId: 25,
    brandId: 1,
  },
  {
    categoryId: 31,
    brandId: 1,
  },
  {
    categoryId: 32,
    brandId: 1,
  },
  {
    categoryId: 27,
    brandId: 81,
  },
  {
    categoryId: 33,
    brandId: 1,
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
    categoryId: 37,
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
    brandId: 60,
  },
  {
    categoryId: 42,
    brandId: 82,
  },
  {
    categoryId: 43,
    brandId: 1,
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
    brandId: 3,
  },
  {
    categoryId: 48,
    brandId: 1,
  },
  {
    categoryId: 49,
    brandId: 1,
  },
  {
    categoryId: 50,
    brandId: 85,
  },
  {
    categoryId: 50,
    brandId: 83,
  },
  {
    categoryId: 50,
    brandId: 43,
  },
  {
    categoryId: 50,
    brandId: 42,
  },
  {
    categoryId: 50,
    brandId: 84,
  },
  {
    categoryId: 50,
    brandId: 86,
  },
  {
    categoryId: 50,
    brandId: 87,
  },
  {
    categoryId: 50,
    brandId: 88,
  },
  {
    categoryId: 50,
    brandId: 89,
  },
  {
    categoryId: 50,
    brandId: 1,
  },
  {
    categoryId: 51,
    brandId: 42,
  },
  {
    categoryId: 51,
    brandId: 1,
  },
  {
    categoryId: 51,
    brandId: 87,
  },
  {
    categoryId: 52,
    brandId: 90,
  },
  {
    categoryId: 52,
    brandId: 91,
  },
  {
    categoryId: 52,
    brandId: 84,
  },
  {
    categoryId: 52,
    brandId: 80,
  },
  {
    categoryId: 52,
    brandId: 43,
  },
  {
    categoryId: 52,
    brandId: 93,
  },
  {
    categoryId: 52,
    brandId: 1,
  },
  {
    categoryId: 53,
    brandId: 42,
  },
  {
    categoryId: 54,
    brandId: 1,
  },
  {
    categoryId: 54,
    brandId: 84,
  },
  {
    categoryId: 54,
    brandId: 79,
  },
  {
    categoryId: 54,
    brandId: 42,
  },
  {
    categoryId: 54,
    brandId: 80,
  },
  {
    categoryId: 56,
    brandId: 84,
  },
  {
    categoryId: 56,
    brandId: 1,
  },
  {
    categoryId: 56,
    brandId: 42,
  },
  {
    categoryId: 56,
    brandId: 79,
  },
  {
    categoryId: 55,
    brandId: 1,
  },
  {
    categoryId: 57,
    brandId: 1,
  },
  {
    categoryId: 57,
    brandId: 84,
  },
  {
    categoryId: 58,
    brandId: 42,
  },
  {
    categoryId: 58,
    brandId: 79,
  },
  {
    categoryId: 59,
    brandId: 1,
  },
  {
    categoryId: 59,
    brandId: 79,
  },
  {
    categoryId: 59,
    brandId: 42,
  },
  {
    categoryId: 59,
    brandId: 84,
  },
  {
    categoryId: 59,
    brandId: 94,
  },
  {
    categoryId: 59,
    brandId: 95,
  },
  {
    categoryId: 59,
    brandId: 96,
  },
  {
    categoryId: 59,
    brandId: 101,
  },
  {
    categoryId: 60,
    brandId: 42,
  },
  {
    categoryId: 60,
    brandId: 1,
  },
  {
    categoryId: 60,
    brandId: 84,
  },
  {
    categoryId: 60,
    brandId: 80,
  },
  {
    categoryId: 60,
    brandId: 97,
  },
  {
    categoryId: 75,
    brandId: 84,
  },
  {
    categoryId: 75,
    brandId: 99,
  },
  {
    categoryId: 75,
    brandId: 100,
  },
  {
    categoryId: 75,
    brandId: 43,
  },
  {
    categoryId: 61,
    brandId: 101,
  },
  {
    categoryId: 61,
    brandId: 1,
  },
  {
    categoryId: 61,
    brandId: 42,
  },
  {
    categoryId: 61,
    brandId: 102,
  },
  {
    categoryId: 62,
    brandId: 103,
  },
  {
    categoryId: 62,
    brandId: 79,
  },
  {
    categoryId: 62,
    brandId: 1,
  },
  {
    categoryId: 62,
    brandId: 104,
  },
  {
    categoryId: 63,
    brandId: 42,
  },
  {
    categoryId: 63,
    brandId: 103,
  },
  {
    categoryId: 63,
    brandId: 84,
  },
  {
    categoryId: 63,
    brandId: 1,
  },
  {
    categoryId: 64,
    brandId: 106,
  },
  {
    categoryId: 64,
    brandId: 105,
  },
  {
    categoryId: 64,
    brandId: 84,
  },
  {
    categoryId: 64,
    brandId: 87,
  },
  {
    categoryId: 64,
    brandId: 42,
  },
  {
    categoryId: 64,
    brandId: 107,
  },
  {
    categoryId: 64,
    brandId: 108,
  },
  {
    categoryId: 64,
    brandId: 80,
  },
  {
    categoryId: 64,
    brandId: 109,
  },
  {
    categoryId: 64,
    brandId: 110,
  },
  {
    categoryId: 64,
    brandId: 111,
  },
  {
    categoryId: 64,
    brandId: 88,
  },
  {
    categoryId: 65,
    brandId: 42,
  },
  {
    categoryId: 65,
    brandId: 112,
  },
  {
    categoryId: 65,
    brandId: 84,
  },
  {
    categoryId: 65,
    brandId: 107,
  },
  {
    categoryId: 66,
    brandId: 84,
  },
  {
    categoryId: 66,
    brandId: 42,
  },
  {
    categoryId: 66,
    brandId: 1,
  },
  {
    categoryId: 66,
    brandId: 103,
  },
  {
    categoryId: 68,
    brandId: 114,
  },
  {
    categoryId: 67,
    brandId: 84,
  },
  {
    categoryId: 67,
    brandId: 79,
  },
  {
    categoryId: 67,
    brandId: 1,
  },
  {
    categoryId: 67,
    brandId: 113,
  },
  {
    categoryId: 67,
    brandId: 103,
  },
  {
    categoryId: 67,
    brandId: 80,
  },
  {
    categoryId: 69,
    brandId: 1,
  },
  {
    categoryId: 70,
    brandId: 1,
  },
  {
    categoryId: 70,
    brandId: 42,
  },
  {
    categoryId: 70,
    brandId: 115,
  },
  {
    categoryId: 70,
    brandId: 116,
  },
  {
    categoryId: 70,
    brandId: 117,
  },
  {
    categoryId: 70,
    brandId: 43,
  },
  {
    categoryId: 71,
    brandId: 42,
  },
  {
    categoryId: 71,
    brandId: 1,
  },
  {
    categoryId: 27,
    brandId: 118,
  },
  {
    categoryId: 27,
    brandId: 43,
  },
  {
    categoryId: 72,
    brandId: 119,
  },
  {
    categoryId: 72,
    brandId: 103,
  },
  {
    categoryId: 72,
    brandId: 1,
  },
  {
    categoryId: 73,
    brandId: 1,
  },
  {
    categoryId: 74,
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
        category: {
          connect: brand.categories.map(br => ({ id: br })),
        },
      },
    });
  }
}

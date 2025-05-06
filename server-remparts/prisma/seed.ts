import { createBrands } from './seed/brands';
import { createCategories } from './seed/categories';
import { createDepartments } from './seed/departments';
import { createItems } from './seed/items';
import { setExchangeRate } from './seed/exchangeRate';
import { createBanners } from './seed/banner';

const seed = async () => {
  await setExchangeRate();
  await createDepartments();
  await createCategories();
  await createBrands();
  await createItems();
  await createBanners();
};

seed();

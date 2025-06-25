import { createBrands } from './seed/brands';
import { createCategories } from './seed/categories';
import { createDepartments } from './seed/departments';
import { createItems } from './seed/items';
import { setExchangeRate } from './seed/exchangeRate';

const seed = async () => {
  await setExchangeRate();
  await createDepartments();
  await createCategories();
  await createBrands();
  await createItems();
};

seed()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch(e => {
    console.error('❌ Seeding failed ', e);
    process.exit(1);
  });

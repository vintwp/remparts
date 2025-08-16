import { createBrands } from './seed/brands';
import { createCategories } from './seed/categories';
import { createDepartments } from './seed/departments';
import { setExchangeRate } from './seed/exchangeRate';
import { createCompliances } from './seed/compliance';
import { createQualities } from './seed/quality';

const seed = async () => {
  await setExchangeRate();
  await createDepartments();
  await createCategories();
  await createBrands();
  await createCompliances();
  await createQualities();
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

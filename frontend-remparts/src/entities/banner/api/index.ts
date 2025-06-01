import { fetch } from '@/shared/api';
import { BANNER_API } from '@/shared/config';

import { Banner } from '../model';

const getBanners = async () => {
  const data = await fetch.getData<Banner[]>(BANNER_API);

  return data;
};

export { getBanners };

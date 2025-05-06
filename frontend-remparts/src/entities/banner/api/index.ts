import { fetch } from '@/shared/api';
import { Banner } from '../model';
import { BANNER_API } from '@/shared/config';

const getBanners = async () => {
  const data = await fetch.getData<Banner[]>(BANNER_API);

  return data;
};

export { getBanners };

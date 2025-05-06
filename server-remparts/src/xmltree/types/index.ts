interface XmlRoot {
  version: string;
  encoding: string;
}

interface Currencies {
  currency: Currency;
}

interface Currency {
  id: string;
  rate: string;
  plus: string;
}

interface Category {
  id: string;
  value: string;
  parentId?: string;
}

interface Categories {
  category: Category[];
}

interface Offer {
  price: number;
  currencyId: string;
  categoryId: number;
  store: boolean;
  name: string;
  vendor: string;
  available: string;
  id: string;
}

interface Offers {
  offer: Offer[];
}

interface Shop {
  name: string;
  company: string;
  url: string;
  currencies: Currencies;
  categories: Categories;
  offers: Offers;
}
interface YmlCatalog {
  shop: Shop;
}

export interface XmlFromServer {
  '?xml': XmlRoot;
  yml_catalog: YmlCatalog;
  date: string;
}

export interface DataFromServer {
  categories: Category[];
  offers: Offer[];
}

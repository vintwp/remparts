interface Item {
  id: number;
  dbId: string;
  name: string;
  price: number;
  stock: number;
  complianceId: null;
  qualityId: number;
  departmentId: number;
  categoryId: number;
  brandId: number;
  images: string[];
}

export { type Item };

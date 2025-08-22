import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SyncCatalogDto {
  @IsString({ message: 'id should be a string' })
  @IsNotEmpty({ message: 'id is required' })
  id: string;

  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price should be a number' })
  price: number;

  @IsNotEmpty({ message: 'PriceWholesaleBasic is required' })
  @IsNumber({}, { message: 'PriceWholesaleBasic should be a number' })
  priceWholesaleBasic: number;

  @IsNotEmpty({ message: 'PriceWholesaleStandard is required' })
  @IsNumber({}, { message: 'PriceWholesaleStandard should be a number' })
  priceWholesaleStandard: number;

  @IsNotEmpty({ message: 'PriceWholesaleTop is required' })
  @IsNumber({}, { message: 'PriceWholesaleTop should be a number' })
  priceWholesaleTop: number;

  @IsString({ message: 'AfmId should be a string' })
  afmId: string;

  @IsNotEmpty({ message: 'CategoryId is required' })
  @IsInt({ message: 'CategoryId should be an integer' })
  categoryId: number;

  @IsNotEmpty({ message: 'DepartmentId is required' })
  @IsInt({ message: 'DepartmentId should be an integer' })
  departmentId: number;

  @IsNotEmpty({ message: 'BrandId is required' })
  @IsInt({ message: 'BrandId should be an integer' })
  brandId: number;

  @IsInt({ message: 'QualityId should be an integer' })
  qualityId: number;

  @IsInt({ message: 'ComplianceId should be an integer' })
  complianceId: number;

  @IsNotEmpty({ message: 'Stock is required' })
  @IsInt({ message: 'Stock should be an integer' })
  stock: number;
}

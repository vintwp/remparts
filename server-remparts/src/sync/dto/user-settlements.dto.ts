import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CustomerPriceTier } from 'src/shared/types/';

enum Currency {
  USD = 'Доллар',
  UAH = 'Гривна',
}

class Payment {
  @IsString({ message: 'Payment id should be a string' })
  @IsNotEmpty({ message: 'Payment id is required' })
  id: string;

  @IsString({ message: 'Hash should be a string' })
  @IsNotEmpty({ message: 'Hash is required' })
  hash: string;

  @IsString({ message: 'Payment date should be a string' })
  @IsNotEmpty({ message: 'Payment date is required' })
  createdAt: string;

  @IsNumber({}, { message: 'Payment value should be a number' })
  value: number;

  @IsEnum(Currency, {
    message: 'Currency should be "Доллар" | "Гривна"',
  })
  currency: Currency;
}

class Item {
  @IsString({ message: 'Item id should be a string' })
  @IsNotEmpty({ message: 'Item id is required' })
  id: string;

  @IsString({ message: 'Item name should be a string' })
  @IsNotEmpty({ message: 'Item name id is required' })
  name: string;

  @IsNumber({}, { message: 'Item qty should be a number' })
  qty: number;

  @IsNumber({}, { message: 'Item price should be a number' })
  price: number;

  @IsNumber({}, { message: 'Item total summary should be a number' })
  amountPerItem: number;
}

class Invoice {
  @IsString({ message: 'Invoice id should be a string' })
  @IsNotEmpty({ message: 'Invoice id is required' })
  id: string;

  @IsString({ message: 'Hash should be a string' })
  @IsNotEmpty({ message: 'Hash is required' })
  hash: string;

  @IsString({ message: 'Date should be a string' })
  @IsNotEmpty({ message: 'Date is required' })
  createdAt: string;

  @IsNumber({}, { message: 'Date should be a string' })
  totalAmount: number;

  @IsString({ message: 'Comment should be a string' })
  @IsOptional()
  comment?: string;

  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}

export class UserSettlementsDto {
  @IsString({ message: 'Client id should be a string' })
  @IsNotEmpty({ message: 'Client id is required' })
  id1c: string;

  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name1c: string;

  @IsEnum(CustomerPriceTier, {
    message:
      'CustomerPriceTier should be "WHOLESALE_TOP" | "WHOLESALE_STANDARD" | "WHOLESALE_BASIC" | "RETAIL"',
  })
  customerPriceTier: CustomerPriceTier;

  @IsNumber({}, { message: 'Balance should be a number' })
  balance: number;

  @ValidateNested({ each: true })
  @Type(() => Payment)
  payments: Payment[];

  @ValidateNested({ each: true })
  @Type(() => Invoice)
  invoices: Invoice[];
}

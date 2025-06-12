import { IsNumber, IsPositive } from 'class-validator';

export class AddDeleteItemCartDto {
  @IsNumber({}, { message: 'ItemId should be a number' })
  itemId: number;
  @IsNumber({}, { message: 'ItemQty should be a number' })
  @IsPositive({ message: 'ItemQty should be a positive number' })
  itemQty: number;
}

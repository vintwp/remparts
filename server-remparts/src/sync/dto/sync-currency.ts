import { IsNumber, IsPositive } from 'class-validator';

export class SyncCurrencyDto {
  @IsNumber({}, { message: 'ItemId should be a number' })
  value: number;
}

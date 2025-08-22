import { IsNumber } from 'class-validator';

export class SyncCurrencyDto {
  @IsNumber({}, { message: 'Currency value should be a number' })
  value: number;
}

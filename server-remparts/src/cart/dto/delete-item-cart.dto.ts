import { IsNumber } from 'class-validator';

export class DeleteItemCartDto {
  @IsNumber({}, { each: true, message: 'ItemId should be a number' })
  itemId: number[];
}

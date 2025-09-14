import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostProcessedOrdersDto {
  @IsNumber({}, { message: 'Id should be a number' })
  @IsNotEmpty({ message: 'Id is required' })
  id: number;

  @IsString({ message: 'id1c should be a string' })
  @IsNotEmpty({ message: 'id1c is required' })
  id1c: string;

  @IsBoolean({ message: 'Processed should be a boolean' })
  @IsNotEmpty({ message: 'Processed is required' })
  processed: boolean;

  @IsString({ message: 'Invoice Id should be a string' })
  @IsNotEmpty({ message: 'Invoice Id is required' })
  invoiceId: string;

  @IsString({ message: 'Comment should be a string' })
  @IsOptional()
  comment?: string;
}

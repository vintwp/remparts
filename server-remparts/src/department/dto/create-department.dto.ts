import { IsString, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @IsString({
    message: 'Name could not be an empty',
  })
  readonly name: string;
}

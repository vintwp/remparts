import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
  IsOptional,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

class PlaceDto {
  @IsString({ message: 'Place Id should be a string' })
  @IsNotEmpty({ message: 'Place Id is required' })
  id: string;

  @IsString({ message: 'Place Name should be a string' })
  @IsNotEmpty({ message: 'Place Name is required' })
  name: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Please add correct email. For example: test@gmail.com ' })
  email: string;

  @IsOptional()
  @IsString({ message: 'First Name should be a string' })
  @IsNotEmpty({ message: 'First Name is required' })
  @MaxLength(50, { message: 'First Name should not be longer than 50 symbols' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Last Name should be a string' })
  @IsNotEmpty({ message: 'Last is required' })
  @MaxLength(50, { message: 'Last Name should not be longer than 50 symbols' })
  lastName: string;

  @IsOptional()
  @IsString({ message: 'Patronymic Name should be a string' })
  @IsNotEmpty({ message: 'Patronymic Name is required' })
  @MaxLength(50, { message: 'Patronymic Name should not be longer than 50 symbols' })
  patronymicName: string;

  @IsOptional()
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password should not less than 6 symbols' })
  @MaxLength(32, { message: 'Password should not be longer than 32 symbols' })
  currentPassword: string;

  @IsOptional()
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password should not less than 6 symbols' })
  @MaxLength(32, { message: 'Password should not be longer than 32 symbols' })
  newPassword: string;

  @IsOptional()
  @IsString({ message: 'Phone number should be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(12, 12, { message: 'Phone number should be 12 characters length' })
  @Matches(/^\d{12}$/, { message: 'Phone number should contains only digits' })
  phoneNumber: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlaceDto)
  city: PlaceDto;

  @IsOptional()
  @Type(() => PlaceDto)
  warehouse: PlaceDto;
}

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please add correct email. For example: test@gmail.com ' })
  email: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password should not less than 6 symbols' })
  @MaxLength(16, { message: 'Password should not be longer than 16 symbols' })
  password: string;
}

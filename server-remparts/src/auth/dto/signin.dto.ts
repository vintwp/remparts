import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignIn {
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    {},
    { message: 'Please add correct email. For example: test@gmail.com ' },
  )
  email: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password should not less than 6 symbols' })
  @MaxLength(32, { message: 'Password should not be longer than 32 symbols' })
  password: string;
}

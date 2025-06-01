import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { IsPasswordContstraintMatching } from '../decorators/is-password-matching-constraint.decorator';

export class RegisterDto {
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please add correct email. For example: test@gmail.com ' })
  email: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password should not less than 6 symbols' })
  @MaxLength(32, { message: 'Password should not be longer than 32 symbols' })
  password: string;

  @IsString({ message: 'Repeat Password should be a string' })
  @IsNotEmpty({ message: 'Repeat Password is required' })
  @MinLength(6, { message: 'Repeat Password should not less than 6 symbols' })
  @MaxLength(32, { message: 'Repeat Password should not be longer than 32 symbols' })
  @Validate(IsPasswordContstraintMatching, { message: 'Passwords don`t match, please try again.' })
  confirmPassword: string;
}

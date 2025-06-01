import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail(
    {},
    { message: 'Email is not valid. Please add correct email. For example: test@gmail.com ' },
  )
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

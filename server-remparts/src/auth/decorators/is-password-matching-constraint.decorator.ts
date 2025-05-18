import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegisterDto } from '../dto/register.dto';

@ValidatorConstraint({ name: 'isPasswordContstraintMatching', async: false })
export class IsPasswordContstraintMatching implements ValidatorConstraintInterface {
  public validate(repeatPassword: string, args: ValidationArguments) {
    const validationObject = args.object as RegisterDto;

    return repeatPassword === validationObject.password;
  }

  public defaultMessage(): string {
    return 'Passwords don`t match, please try again.';
  }
}

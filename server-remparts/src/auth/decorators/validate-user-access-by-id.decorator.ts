import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ValidateUserAccessByIdGuard } from '../guards/validate-user-access-by-id.guard';

const UseParam = (param: string = 'id') => SetMetadata('param', param);

export function ValidateUserAccessById(param?: string) {
  return applyDecorators(UseParam(param), UseGuards(ValidateUserAccessByIdGuard));
}

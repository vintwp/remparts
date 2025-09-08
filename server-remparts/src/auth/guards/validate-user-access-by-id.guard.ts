import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { messagesFromServer } from 'src/config/messagesFromServer';
import { ROLES_KEY } from 'src/constants';
import { ROLE, TJwtUser } from 'src/shared/types/';

@Injectable()
export class ValidateUserAccessByIdGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();

    const idFromRequest = +req.params.id as number;

    if (isNaN(+idFromRequest) || typeof +idFromRequest !== 'number')
      throw new ForbiddenException(messagesFromServer.general.incorrectRequestParameters.ua);

    const { id: userId, role } = req.user as TJwtUser;

    if (role !== 'ADMIN' && userId !== idFromRequest) {
      throw new ForbiddenException(messagesFromServer.general.accessDenied.ua);
    }

    return true;
  }
}

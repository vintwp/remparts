import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/constants';
import { ROLE } from 'src/shared/types/';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private allowedRoles(requiredRoles: ROLE[]) {
    const roles: ROLE[] = [];

    for (const requiredRole of requiredRoles) {
      switch (requiredRole) {
        case 'ADMIN':
          roles.push('ADMIN');
          break;
        case 'MANAGER':
          roles.push(...roles, 'ADMIN', 'MANAGER');
          break;
        default:
          roles.push(...roles, 'ADMIN', 'MANAGER', 'USER');
          break;
      }
    }

    return [...new Set(roles)];
  }

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]) as ROLE[];

    if (!requiredRoles) {
      return true;
    }

    const allowedRoles: ROLE[] = this.allowedRoles(requiredRoles);

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    const hasRole = allowedRoles.some(role => user?.role?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have sufficient permissions to access this resource.',
      );
    }

    return true;
  }
}

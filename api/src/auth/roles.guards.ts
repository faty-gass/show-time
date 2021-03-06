import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
      ) {}

  canActivate(context: ExecutionContext): boolean | Promise <boolean> | Observable <boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = roles.indexOf(user.role);
    if (hasRole >-1){
        return true
    } else {
        return false
    }

    //return matchRoles(roles, user.roles);
  }
}
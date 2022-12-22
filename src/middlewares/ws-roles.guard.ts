import { WsController } from '../ws/ws.controller';
import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection, isEmpty } from 'lodash';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants';
import { ModifyWebSocket } from 'src/interfaces/ws';

@Injectable()
class WsRole implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<ROLES[]>('roles', context.getHandler());
    const request: ModifyWebSocket = context.switchToWs().getClient();

    const isWrongPermissions = isEmpty(intersection(request.userRoles, roles));

    if (isWrongPermissions) {
      WsController.sendError(request, {
        message: 'You do not have necessary permissions',
        status: 401,
      });

      return false;
    }

    return true;
  }
}

export const WsRoleGuard = (role: ROLES | ROLES[]) => {
  let roles = role;
  if (typeof role === 'string') {
    roles = [role];
  }
  return applyDecorators(UseGuards(WsRole), SetMetadata('roles', roles));
};
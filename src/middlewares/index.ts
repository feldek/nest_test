import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { ActionTypes } from 'src/interfaces/ws';
import { joiSchema } from 'src/ws/schema/intex';
import { WsErrorInterceptor } from './ws.interceptor';
import { SubscribeMessage } from '@nestjs/websockets';
import { JoiValidationPipe } from './ws-joi.pipe';
import { WsRoleGuard } from './ws-roles.guard';
import { ROLES } from 'src/constants';

export const WsRouterDecorators = (action: ActionTypes, roles: ROLES | ROLES[] = ROLES.USER) => {
  const existSchema = joiSchema[action] ? [UsePipes(new JoiValidationPipe(joiSchema[action]))] : [];
  const addRoleGuard = roles.length !== 0 ? [WsRoleGuard(roles)] : [];
  return applyDecorators(
    ...existSchema,
    ...addRoleGuard,
    UseInterceptors(new WsErrorInterceptor(action)),
    SubscribeMessage(action),
  );
};

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RefreshJwtPayload } from 'types';

export const CurrentUser = createParamDecorator(
  (data: keyof RefreshJwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);

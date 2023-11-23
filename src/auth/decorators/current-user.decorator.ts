import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'types';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined | 'id', context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request.user;
    if (data === 'id') return request.user.userId;
    return request.user[data];
  },
);

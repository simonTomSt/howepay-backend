import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from './serialize.interceptor';

export const Serialize = (dto: ClassConstructor<unknown>) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

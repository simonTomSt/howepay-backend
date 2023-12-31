import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class RefreshJwtGuard extends AuthGuard('jwt-refresh-token') {}

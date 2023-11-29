import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { Serialize } from 'src/serialization/serialize.decorator';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, SignedInUserDto } from './dtos';
import { CurrentUser, Public } from './decorators';
import { JwtAuthGuard } from './guards';
import RefreshJwtGuard from './guards/refresh-jwt.guard';
import { getBearerTokenFromHeaders } from 'src/utils';
import { Request as ExpressRequest } from 'express';
import { UserDto } from 'src/users/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  @Serialize(SignedInUserDto)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('/sign-in')
  @Serialize(SignedInUserDto)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('/sign-out')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signOut(@CurrentUser('id') currentUserId: string) {
    return this.authService.signOut(currentUserId);
  }

  @Post('/refresh-token')
  @UseGuards(RefreshJwtGuard)
  @Serialize(SignedInUserDto)
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Request() req: ExpressRequest,
    @CurrentUser('id') currentUserId: string,
  ) {
    const refreshToken = getBearerTokenFromHeaders(req);

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return this.authService.refreshTokens(currentUserId, refreshToken);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @HttpCode(HttpStatus.OK)
  async getMe(@CurrentUser('id') currentUserId: string) {
    return this.authService.getMe(currentUserId);
  }
}

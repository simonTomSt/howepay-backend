import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/serialization/serialize.decorator';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, SignedInUser } from './dtos';
import { Public } from './decorators';
import { JwtGuard } from './guards';
import RefreshJwtGuard from './guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  @Serialize(SignedInUser)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('/sign-in')
  @Serialize(SignedInUser)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('/sign-out')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async signOut(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('/refresh-token')
  @UseGuards(RefreshJwtGuard)
  @Serialize(SignedInUser)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}

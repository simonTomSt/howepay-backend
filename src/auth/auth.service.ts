import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokensType } from 'types';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findOneByEmail(
      signUpDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Provided email is in use');
    }

    const passwordHash = await this.hash(signUpDto.password);

    const user = await this.usersService.create({
      ...signUpDto,
      password: passwordHash,
    });

    const tokens = await this.createTokens(user.id, user.email, user.username);
    await this.updateUserRefreshToken(user.id, tokens.refresh_token);

    return { ...tokens, ...user };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.getUserWithPasswordByEmail(
      signInDto.email,
    );

    if (!user) {
      throw new BadRequestException('Bad credentials');
    }

    const isMatch = await this.compareHash(signInDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Bad credentials');
    }

    const tokens = await this.createTokens(user.id, user.email, user.username);
    await this.updateUserRefreshToken(user.id, tokens.refresh_token);

    return { ...tokens, ...user };
  }

  compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  hash(password: string) {
    const rounds = 12;
    return bcrypt.hash(password, rounds);
  }

  private async createTokens(
    userId: string,
    email: string,
    username: string,
  ): Promise<TokensType> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateUserRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.hash(refreshToken);
    await this.usersService.updateById(userId, { refreshToken: hash });
  }
}

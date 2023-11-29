import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dtos';
import { TokensDto } from './tokens.dto';

export class SignedInUserDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => TokensDto)
  tokens: TokensDto;
}

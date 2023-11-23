import { Expose } from 'class-transformer';
import { UserDto } from 'src/users/dtos';

export class SignedInUserDto extends UserDto {
  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}

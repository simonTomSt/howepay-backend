import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dtos';

export class SignedInUser extends UserDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}

import { IsEmail } from 'class-validator';
export class CreateUserDto {
  username: string;

  fullname: string;

  @IsEmail()
  email: string;
}

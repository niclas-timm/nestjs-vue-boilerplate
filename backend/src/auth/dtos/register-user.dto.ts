import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}

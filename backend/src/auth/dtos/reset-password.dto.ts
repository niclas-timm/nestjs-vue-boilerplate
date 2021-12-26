import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  newPassword: string;
}

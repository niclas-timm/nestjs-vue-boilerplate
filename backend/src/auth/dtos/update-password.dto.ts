import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}

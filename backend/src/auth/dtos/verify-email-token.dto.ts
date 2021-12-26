import { IsNotEmpty } from 'class-validator';

export class VerifyEmailTokenDto {
  @IsNotEmpty()
  token: string;
}

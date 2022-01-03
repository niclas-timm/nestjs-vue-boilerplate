import { ForgotPasswordToken } from '../auth/entities/forgot-password-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User, ForgotPasswordToken])],
})
export class UserModule {}

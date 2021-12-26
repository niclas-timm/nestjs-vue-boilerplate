import { ForgotPasswordToken } from './forgot-password-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './../mail/mail.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    MailModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1000000s' },
    }),
    TypeOrmModule.forFeature([ForgotPasswordToken]),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

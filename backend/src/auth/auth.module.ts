import { ForgotPasswordToken } from './forgot-password-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './../mail/mail.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleOAuthController } from './controllers/google-oauth.controller';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
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
  controllers: [AuthController, GoogleOAuthController],
})
export class AuthModule {}

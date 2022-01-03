import { PasswordService } from './services/password-auth.service';
import { OAuthService } from './services/oauth.service';
import { AuthSerializer } from './providers/serialization.provider';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { TwitterOAuthController } from './controllers/twitter-oauth.controller';
import { ForgotPasswordToken } from './entities/forgot-password-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleOAuthController } from './controllers/google-oauth.controller';

@Module({
  providers: [
    AuthService,
    OAuthService,
    PasswordService,
    LocalStrategy,
    GoogleStrategy,
    TwitterStrategy,
    AuthSerializer,
  ],
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
    MailModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1000000s' },
    }),
    TypeOrmModule.forFeature([ForgotPasswordToken]),
  ],
  exports: [AuthService, OAuthService, PasswordService],
  controllers: [AuthController, GoogleOAuthController, TwitterOAuthController],
})
export class AuthModule {}

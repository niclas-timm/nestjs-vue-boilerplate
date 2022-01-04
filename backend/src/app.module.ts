import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

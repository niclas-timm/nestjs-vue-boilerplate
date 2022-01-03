import { TypeORMSession } from './auth/entities/session.entity';
import { ForgotPasswordToken } from './auth/entities/forgot-password-token.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { MailModule } from './mail/mail.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  // Imports.
  imports: [
    UserModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      level: 'error',
      transports: [
        new winston.transports.File({
          filename: process.env.ERROR_LOG_FILE_PATH || 'error.log',
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'database',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'nestjs',
      password: process.env.DB_PASSWORD || 'nestjs',
      database: process.env.DB_DATABASE || 'vuenestboilerplate',
      entities: [User, ForgotPasswordToken, TypeORMSession],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

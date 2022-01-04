import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPasswordToken } from 'src/auth/entities/forgot-password-token.entity';
import { TypeORMSession } from 'src/auth/entities/session.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
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
})
export class DatabaseModule {}

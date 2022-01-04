import { WinstonModule } from 'nest-winston';
import { Module } from '@nestjs/common';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'error',
      transports: [
        new winston.transports.File({
          filename: process.env.ERROR_LOG_FILE_PATH || 'error.log',
        }),
      ],
    }),
  ],
})
export class LoggerModule {}

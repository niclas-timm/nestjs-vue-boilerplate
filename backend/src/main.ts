import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Allow requests from frontend.
  app.enableCors({
    origin: 'http://localhost:8080',
  });
  await app.listen(3000);
}
bootstrap();

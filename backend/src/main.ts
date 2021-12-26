import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Allow requests from frontend.
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
  });
  await app.listen(3000);
}
bootstrap();

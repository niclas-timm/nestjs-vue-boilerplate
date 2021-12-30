import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get some config from the .env file.
  const APP_PORT = configService.get('API_PORT') || 3000;
  const ALLOWED_CORS_ORIGIN = configService.get('FRONTEND_URL');
  const SESSION_SECRET =
    configService.get('SESSION_SECRET') || 'my-not-so-secure-secret';

  // Enable sessions. Required by Twitter passport.
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Allow requests from frontend.
  app.enableCors({
    origin: 'http://localhost:8080',
  });

  // Start the app.
  await app.listen(APP_PORT);
}
bootstrap();

import { TypeORMSession } from './auth/entities/session.entity';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository } from 'typeorm';
import * as passport from 'passport';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get some config from the .env file.
  const APP_PORT = configService.get('API_PORT') || 3000;
  const ALLOWED_CORS_ORIGIN = configService.get('FRONTEND_URL');
  const SESSION_SECRET =
    configService.get('SESSION_SECRET') || 'my-not-so-secure-secret';
  const ENABLE_LOGGING = configService.get('ENABLE_LOGGING') || false;

  // Enable sessions for authentication purposes.
  // Sessions are stored in the database.
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(getRepository(TypeORMSession)),
      cookie: {
        sameSite: false,
        httpOnly: true,
        maxAge: 600000,
      },
    }),
  );

  // Logging. Disabled by default.
  if (ENABLE_LOGGING) {
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  }

  // Initliaze passport & passport session support.
  app.use(passport.initialize());
  app.use(passport.session());

  // Allow requests from frontend.
  app.enableCors({
    origin: ALLOWED_CORS_ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
  });

  await app.listen(APP_PORT);
}
bootstrap();

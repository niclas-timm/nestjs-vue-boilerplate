import { TypeORMSession } from './session/session.entity';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository } from 'typeorm';
import * as passport from 'passport';

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
      // resave: false,
      // saveUninitialized: false,
      store: new TypeormStore().connect(getRepository(TypeORMSession)),
      cookie: {
        sameSite: false,
        httpOnly: true,
        maxAge: 600000,
      },
    }),
  );

  // Initliaze passport & passport session support.
  app.use(passport.initialize());
  app.use(passport.session());

  // Allow requests from frontend.
  app.enableCors({
    origin: ALLOWED_CORS_ORIGIN,
    allowedHeaders: '*',
    credentials: true,
    methods: '*',
  });

  // Start the app.
  await app.listen(APP_PORT);
}
bootstrap();

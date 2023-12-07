import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

import { AppModule } from './app.module';
import { LoggingService } from './common/services/custom-logger/custom-logger.service';
import { CustomExceptionFilter } from './common/filters/exception.filter';
import { JwtAuthMiddleware } from './common/middlewares/jwt-auth.middleware';

const port = process.env.PORT || 4000;

const loggingService = new LoggingService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(cookieParser());

  app.useLogger(loggingService);
  app.useGlobalFilters(new CustomExceptionFilter(loggingService));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Origin, Content-Type, Accept',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();

process.on('unhandledRejection', (reason, promise) => {
  loggingService.logUnhandledRejection(promise, reason);
});

process.on('uncaughtException', (err) => {
  loggingService.error('Uncaught Exception: ', err);
  process.exit(1);
});

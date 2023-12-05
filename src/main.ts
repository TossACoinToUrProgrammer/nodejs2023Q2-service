import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggingService } from './common/custom-logger/custom-logger.service';
import { CustomExceptionFilter } from './common/filters/exception.filter';

const port = process.env.PORT || 4000;

const loggingService = new LoggingService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(loggingService);
  app.useGlobalFilters(new CustomExceptionFilter(loggingService));
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

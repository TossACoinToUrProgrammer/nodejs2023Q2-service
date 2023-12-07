import { Module } from '@nestjs/common';
import { LoggingService } from './custom-logger.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}

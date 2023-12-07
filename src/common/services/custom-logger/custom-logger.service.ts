import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  private logLevel: LogLevel =
    (Number(process.env.LOG_LEVEL) as LogLevel) || LogLevel.INFO;

  logRequest(
    method: string,
    originalUrl: string,
    body: string,
    queryParams: string,
  ) {
    if (this.logLevel >= LogLevel.INFO) {
      console.log(
        '\x1b[36m%s\x1b[0m',
        `[Request] Method: ${method}, Url: ${originalUrl}, Body: ${body}, Query params: ${queryParams}`,
      );
    }
  }

  logResponse(statusCode: number, method: string, originalUrl: string) {
    if (this.logLevel >= LogLevel.INFO) {
      console.log(
        '\x1b[36m%s\x1b[0m',
        `[Response] Method: ${method}, Url: ${originalUrl}, Status code: ${statusCode}`,
      );
    }
  }

  logError(
    statusCode: number,
    method: string,
    originalUrl: string,
    message: string | object,
  ) {
    if (this.logLevel >= LogLevel.ERROR) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `[Error] ${method} ${originalUrl}, Status code: ${statusCode}, Message: ${message}`,
      );
    }
  }

  logUnhandledRejection(promise, reason) {
    if (this.logLevel >= LogLevel.ERROR) {
      console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    }
  }
}

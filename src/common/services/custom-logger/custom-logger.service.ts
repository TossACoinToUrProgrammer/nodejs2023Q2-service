import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  private readonly filePath = path.join(__dirname, './application.log');
  private readonly errorFilePath = path.join(__dirname, './errors.log');
  private readonly fileSizeLimit = Number(process.env.MAX_LOG_FILE_SIZE);

  private logLevel: LogLevel = process.env.LOG_LEVEL === undefined ? LogLevel.INFO : Number(process.env.LOG_LEVEL)

  async logToFile(message: string, isErrorLog = false) {
    const datetime = new Date().toISOString();
    const logMessage = `${datetime}: ${message}\n`;

    const path = isErrorLog ? this.errorFilePath : this.filePath;

    await this.rotateLogFileIfNecessary(path);
    await fs.writeFile(path, logMessage, { flag: 'a' });
  }

  logRequest(
    method: string,
    originalUrl: string,
    body: string,
    queryParams: string,
  ) {
    if (this.logLevel >= LogLevel.INFO) {
      const message = `[Request] Method: ${method}, Url: ${originalUrl}, Body: ${body}, Query params: ${queryParams}`;
      console.log('\x1b[36m%s\x1b[0m', message);

      this.logToFile(message);
    }
  }

  logResponse(statusCode: number, method: string, originalUrl: string) {
    if (this.logLevel >= LogLevel.INFO) {
      const message = `[Response] Method: ${method}, Url: ${originalUrl}, Status code: ${statusCode}`;
      console.log('\x1b[36m%s\x1b[0m', message);
      this.logToFile(message);
    }
  }

  logError(
    statusCode: number,
    method: string,
    originalUrl: string,
    message: string | object,
  ) {
    if (this.logLevel >= LogLevel.ERROR) {
      const errorMsg = `[Error] ${method} ${originalUrl}, Status code: ${statusCode}, Message: ${JSON.stringify(
        message,
      )}`;
      console.log('\x1b[31m%s\x1b[0m', errorMsg);
      this.logToFile(errorMsg, true);
    }
  }

  logUnhandledRejection(promise, reason) {
    if (this.logLevel >= LogLevel.ERROR) {
      console.log('Unhandled Rejection at:', promise, 'reason:', reason);
      this.logToFile(
        `Unhandled Rejection at: ${promise} reason: ${reason}`,
        true,
      );
    }
  }

  private async rotateLogFileIfNecessary(path: string) {
    let fileStat;
    try {
      fileStat = await fs.stat(path);
    } catch (error) {
      // If it does not exist, exit the function
      if (error.code === 'ENOENT') {
        return;
      }
      throw error; // If the error is something else, it's unexpected so throw it
    }

    const { size } = fileStat;

    if (size > this.fileSizeLimit) {
      const datetime = new Date().toISOString().replace(/:/g, '.');
      const rotatedFilePath = `${path}.${datetime}`;
      await fs.rename(path, rotatedFilePath);
    }
  }
}

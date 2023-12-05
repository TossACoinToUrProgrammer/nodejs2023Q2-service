import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';

import { LoggingService } from '../custom-logger/custom-logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { body, query, method, originalUrl } = req;
    this.logger.logRequest(
      method,
      originalUrl,
      JSON.stringify(body),
      JSON.stringify(query),
    );

    res.on('finish', () => {
      this.logger.logResponse(res.statusCode, method, originalUrl);
    });

    next();
  }
}

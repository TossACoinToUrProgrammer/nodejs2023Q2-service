import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: 'No Authorization header or it doesnt follow bearer scheme',
        });
      }

      const token = authHeader.split(' ')[1];
      if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token is not valid or expired' });
    }
  }
}

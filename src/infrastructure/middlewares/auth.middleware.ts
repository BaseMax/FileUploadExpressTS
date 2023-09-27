import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { authConfig } from '../../config';

interface DecodedToken {
  id: number;
  role: string;
}

@Service()
export class AuthCheck implements ExpressMiddlewareInterface {
  use(request: any, response: Response, next: NextFunction) {
    const token = request.cookies.token;

    if (!token) {
      return response
        .status(401)
        .json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decodedToken = jwt.verify(token, authConfig.secret) as DecodedToken;

      request.user = { id: decodedToken.id, role: decodedToken.role };
      next();
    } catch (error) {
      return response.status(400).json({ message: 'Invalid token.' });
    }
  }
}

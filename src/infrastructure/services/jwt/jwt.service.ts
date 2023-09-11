import { Service } from 'typedi';
import { JwtPayload } from '../../../modules/auth/types/jwt.payload';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '../../../config';

@Service()
export class JwtService {
  sign(jwtPayload: JwtPayload) {
    return jwt.sign(jwtPayload, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    });
  }
}

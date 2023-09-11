import { env, envOrFail } from '../utils';

export const authConfig = {
  secret: envOrFail('SECRET_KEY'),
  expiresIn: env('EXPIRE_TIME', '1d'),
  cookie: {
    maxAge: env('COOKIE_MAX_AGE', '86400000')
  }
};

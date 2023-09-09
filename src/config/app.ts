import { env } from '../utils/env';

export const appConfig = {
  node: env('NODE_ENV', 'development'),
  isProduction: env('NODE_ENV') === 'production',
  isDevelopment: env('NODE_ENV') === 'development',
  isStaging: env('NODE_ENV') === 'staging',
  port: Number(env('PORT', '3000'))
};

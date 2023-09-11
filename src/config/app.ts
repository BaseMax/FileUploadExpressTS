import { env } from '../utils';

export const appConfig = {
  node: env('NODE_ENV', 'development'),
  isProduction: env('NODE_ENV') === 'production',
  isDevelopment: env('NODE_ENV') === 'development',
  isStaging: env('NODE_ENV') === 'staging',
  port: Number(env('PORT', '3000')),
  host: env('HOST', 'localhost'),
  routePrefix: env('ROUTE_PREFIX', '/api'),
  controllersDir: env('CONTROLLERS_DIR', '/modules/*/*.controller.ts'),
  middlewaresDir: env(
    'MIDDLEWARES_DIR',
    '/infrastructure/middlewares/*.middleware.ts'
  )
};

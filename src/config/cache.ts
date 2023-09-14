import { env } from '../utils';

export const cacheConfig = {
  defaultDriver: env('CACHING_DEFAULT_DRIVER', 'redis'),

  redis: {
    host: env('REDIS_HOST', 'localhost'),
    port: env('REDIS_PORT', '6379')
  }
};

import { cacheConfig } from '../../../../config/cache';
import { Cache } from '../interface/cache.interface';
import { Redis } from 'ioredis';

export class RedisCacheService implements Cache {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: cacheConfig.redis.host,
      port: +cacheConfig.redis.port
    });
  }

  get(key: string): unknown {
    return this.client.get(key);
  }

  set(key: string, value: any, ttl: number): void {
    this.client.set(key, value, 'EX', ttl);
  }
}

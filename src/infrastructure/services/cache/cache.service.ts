import { Service } from 'typedi';
import { Cache } from './interface/cache.interface';
import { RedisCacheService } from './provider/redis.provider';
import { cacheConfig } from '../../../config/cache';

@Service()
export class CacheService implements Cache {
  private provider!: Cache;

  constructor() {
    this.setProvider(cacheConfig.defaultDriver);
  }

  setProvider(provider: string) {
    switch (provider) {
      case 'redis':
        this.provider = new RedisCacheService();
        break;

      default:
        break;
    }
  }

  public get(key: string): unknown {
    return this.provider.get(key);
  }

  public set(key: string, value: any, ttl: number = 3600): void {
    return this.provider.set(key, value, ttl);
  }
}

import { Service } from 'typedi';
import { hashingConfig } from '../../../config/hash';
import { BcryptProvider } from './Providers/bcrypt.provider';
import { HashProvider } from './hashProvider.interface';

@Service()
export class HashService {
  private provider!: HashProvider;

  constructor() {
    this.setProvider(hashingConfig.defaultDriver);
  }

  setProvider(provider: string) {
    switch (provider) {
      case 'bcrypt':
        this.provider = new BcryptProvider();
        break;

      default:
        break;
    }
    return this;
  }

  public async make(data: string, saltOrRounds: string | number = 10) {
    return await this.provider.make(data, saltOrRounds);
  }

  public async compare(data: string, encrypted: string) {
    return await this.provider.compare(data, encrypted);
  }
}

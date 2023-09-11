import bcrypt from 'bcrypt';
import { hashingConfig } from '../../../../config/hash';
import { HashProvider } from '../hashProvider.interface';

export class BcryptProvider implements HashProvider {
  private bcrypt = bcrypt;

  private defaultRounds = hashingConfig.disks.bcrypt.defaultRounds;

  public async make(
    data: string,
    saltOrRounds: string | number = this.defaultRounds
  ): Promise<string> {
    return await this.bcrypt.hash(data, saltOrRounds);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return await this.bcrypt.compare(data, encrypted);
  }
}

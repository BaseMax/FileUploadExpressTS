import { env } from '../utils';

export const hashingConfig = {
  defaultDriver: env('HASHING_DEFAULT_DRIVER', 'bcrypt'),

  disks: {
    bcrypt: {
      defaultRounds: 10
    }
  }
};

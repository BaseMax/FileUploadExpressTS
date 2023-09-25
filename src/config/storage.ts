import { env } from '../utils';

export const storageConfig = {
  endPoint: env('STORAGE_ENDPOINT'),
  port: env('STORAGE_PORT'),
  accessKey: env('STORAGE_ACCESS_KEY'),
  secretKey: env('STORAGE_SECRET_KEY'),
  bucketName: env('BUCKET_NAME'),
  region: env('STORAGE_REGION', 'US-East'),
  baseS3Path: env('BASE_STORAGE_PATH', 'users/')
};

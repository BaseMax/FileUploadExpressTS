import { S3 } from '@aws-sdk/client-s3';
import { storageConfig } from '../../../config';
import { UploadedFile } from './interface/uploadedFile.interface';
import { Service } from 'typedi';
import { File } from './interface/file.interface';
import { logger } from '../../../utils';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from 'routing-controllers';
import { extension } from 'mime-types';

@Service()
export class S3ManagerService {
  private client: S3;
  private readonly bucketName = storageConfig.bucketName;
  private readonly baseS3Path = storageConfig.baseS3Path;

  constructor() {
    this.client = new S3({
      endpoint: storageConfig.endPoint,
      region: storageConfig.region,
      credentials: {
        accessKeyId: storageConfig.accessKey,
        secretAccessKey: storageConfig.secretKey
      }
    });
  }

  async getObject(key: string) {
    try {
      const file = await this.client.getObject({
        Bucket: this.bucketName,
        Key: `${this.baseS3Path}${key}`
      });

      return file.Body;
    } catch (error) {
      logger.error(error);
      throw new InternalServerError('Internal Server Error server');
    }
  }

  private generateUniqueName(file: File, timestamp: number): string {
    return `${file.originalname}-${timestamp}.${extension(file.mimetype)}`;
  }

  private async uploadFile(
    file: File,
    userId: number,
    directory?: string
  ): Promise<string> {
    const timestamp = Date.now();
    const uniqueName = this.generateUniqueName(file, timestamp);

    let fileKey: string;
    if (directory) {
      fileKey = `${this.baseS3Path}${userId}/${directory}/${uniqueName}`;
    } else {
      fileKey = `${this.baseS3Path}${userId}/${uniqueName}`;
    }

    await this.client.putObject({
      Bucket: this.bucketName,
      Key: fileKey,
      ContentLength: file.size,
      Body: file.buffer
    });

    return uniqueName;
  }

  async upload(
    files: File | File[],
    userId: number,
    directory?: string
  ): Promise<UploadedFile | UploadedFile[] | undefined> {
    try {
      if (Array.isArray(files)) {
        const keys = await Promise.all(
          files.map(async (file) => {
            return {
              key: await this.uploadFile(file, userId, directory),
              size: file.size,
              name: file.originalname,
              type: file.mimetype
            };
          })
        );
        return keys;
      }

      const key = await this.uploadFile(files, userId);
      return {
        key,
        size: files.size,
        name: files.originalname,
        type: files.mimetype
      };
    } catch (error) {
      logger.error(error);
      throw new InternalServerError('Internal Server Error server');
    }
  }

  async checkDirectoryExists(dirPath: string): Promise<void> {
    const s3Objects = await this.client.listObjectsV2({
      Bucket: this.bucketName,
      Prefix: dirPath
    });

    if (s3Objects.Contents && s3Objects.Contents.length > 0) {
      throw new BadRequestError('Directory already exists');
    }
  }

  async createDirectory(dirName: string, userId: number) {
    const newDirPath = `${this.baseS3Path}${userId}/${dirName}/`;

    await this.checkDirectoryExists(newDirPath);

    try {
      await this.client.putObject({
        Bucket: this.bucketName,
        Key: newDirPath
      });

      return { message: 'Directory created successfully' };
    } catch (error) {
      logger.error(error);
      throw new InternalServerError('Internal Server Error server');
    }
  }

  async checkObjectExists(key: string): Promise<boolean> {
    try {
      await this.client.headObject({
        Bucket: this.bucketName,
        Key: `${this.baseS3Path}${key}`
      });

      return true;
    } catch (error) {
      if ((error as { name: string }).name === 'NotFound') return false;
      logger.error(error);
      throw new InternalServerError('Internal Server Error server');
    }
  }

  async copyObject(key: string, newKey: string) {
    const objectExists = await this.checkObjectExists(newKey);
    if (objectExists) throw new BadRequestError('Object in Directory Exists!');

    try {
      await this.client.copyObject({
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${this.baseS3Path}${key}`,
        Key: `${this.baseS3Path}${newKey}`
      });

      return true;
    } catch (error) {
      logger.error(error);
      throw new InternalServerError('Internal Server Error server');
    }
  }

  async deleteObject(path: string) {
    const objectExists = await this.checkObjectExists(path);
    if (!objectExists) throw new NotFoundError('Object Not Found!');

    const key = `${this.baseS3Path}${path}`;

    try {
      await this.client.deleteObject({
        Bucket: this.bucketName,
        Key: key
      });

      return true;
    } catch (err) {
      logger.error(err);
      throw new InternalServerError('Internal Server Error server');
    }
  }
}

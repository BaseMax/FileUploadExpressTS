import { Service } from 'typedi';
import { S3ManagerService } from '../../infrastructure/services/s3-manager/s3.service';
import { File } from '../../infrastructure/services/s3-manager/interface/file.interface';
import { FileRepository } from './file.repository';
import { CreateFileDto } from './dto/createFile.dto';
import { CacheService } from '../../infrastructure/services/cache/cache.service';
import { BadRequestError, InternalServerError } from 'routing-controllers';
import axios from 'axios';

@Service()
export class FileService {
  constructor(
    private readonly s3: S3ManagerService,
    private readonly fileRepository: FileRepository,
    private readonly cacheService: CacheService
  ) {}

  async downloadFile(userId: number, id: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    if (!file) throw new BadRequestError('File not found!');

    const key = `${userId}/${file.path}`;

    return this.s3.getObject(key);
  }

  async uploadFromLink(userId: number, url: string) {
    const response = await axios.get(url, { responseType: 'stream' });

    if (!response || response.status != 200) {
      throw new InternalServerError('can not get file');
    }

    const file: File = {
      originalname: `${userId}`,
      size: response.headers['content-length']
        ? +response.headers['content-length']
        : 0,
      type: response.headers['content-type']
        ? `${response.headers['content-type']}`
        : 'null',
      mimetype: response.headers['content-type']
        ? `${response.headers['content-type']}`
        : 'null',
      buffer: response.data
    };

    const upload = await this.s3.upload(file, userId);

    if (Array.isArray(upload)) {
      return undefined;
    } else {
      return { path: upload?.path };
    }
  }

  async getUserFiles(userId: number) {
    const cache = await this.cacheService.get(`files:${userId}`);

    if (!cache) {
      const files = await this.fileRepository.getUserAllFiles(userId);

      this.cacheService.set(`files:${userId}`, JSON.stringify(files), 60);

      return files;
    } else {
      return JSON.parse(`${cache}`);
    }
  }

  search(userId: number, query: string) {
    return this.fileRepository.search(userId, query);
  }

  async uploadFiles(files: File | File[], userId: number) {
    const upload = await this.s3.upload(files, userId);

    if (Array.isArray(upload)) {
      upload.forEach(async (file) => {
        const fileData: CreateFileDto = {
          size: file.size,
          path: file.path,
          type: file.type,
          name: file.name
        };

        await this.fileRepository.create(userId, fileData);
      });

      return upload.map((files) => files.path);
    } else {
      return { path: upload?.path };
    }
  }

  async renameFile(userId: number, fileId: number, newName: string) {
    const file = await this.fileRepository.findUserFileById(fileId, userId);
    if (!file) throw new BadRequestError('File Not Found!');

    const key = `${userId}/${file.path}`;
    const newNameKey = `${userId}/${newName}`;

    await this.s3.copyObject(key, newNameKey);
    await this.fileRepository.updateFileName(file.id, newName);
  }

  async removeFile(userId: number, id: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    if (!file) throw new BadRequestError('File not found!');

    await this.s3.deleteObject(`${userId}/${file.path}`);

    return this.fileRepository.delete(file.id, userId);
  }
}

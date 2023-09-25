import { Service } from 'typedi';
import { S3ManagerService } from '../../infrastructure/services/s3-manager/s3.service';
import { File } from '../../infrastructure/services/s3-manager/interface/file.interface';
import { FileRepository } from './file.repository';
import { CreateFileDto } from './dto/create-file.dto';
import { CacheService } from '../../infrastructure/services/cache/cache.service';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from 'routing-controllers';
import axios from 'axios';
import { FileData } from './interface/file.interface';
import { DirectoryData } from '../directory/interface/directory.interface';
import { DirectoryService } from '../directory/directory.service';

@Service()
export class FileService {
  constructor(
    private readonly s3: S3ManagerService,
    private readonly fileRepository: FileRepository,
    private readonly cacheService: CacheService,
    private readonly directoryService: DirectoryService
  ) {}

  async moveFile(userId: number, id: number, directoryId?: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    if (!file) throw new NotFoundError('file not found!');

    const key = this.getFileLocation(file as FileData);

    const directory = await this.directoryService.getDirectory(
      directoryId || 0,
      userId
    );

    const newFile: FileData = {
      key: file.key,
      name: file.name,
      size: file.size,
      type: file.type,
      ownerId: file.ownerId,
      numberOfDownloads: 0,
      directoryId: directoryId || 0,
      directory: directory as DirectoryData
    };

    const newKey = this.getFileLocation(newFile);

    const checkFileExists = await this.s3.checkObjectExists(key);
    if (!checkFileExists) throw new NotFoundError('file not found!');

    const checkNewFileExists = await this.s3.checkObjectExists(newKey);
    if (checkNewFileExists)
      throw new BadRequestError('file in directory exists');

    await this.s3.copyObject(key, newKey);
    await this.s3.deleteObject(key);

    return this.fileRepository.update(file.id, {
      directoryId: newFile.directoryId
    });
  }

  async copyFile(userId: number, id: number, directoryId?: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    if (!file) throw new NotFoundError('file not found!');

    const key = this.getFileLocation(file as FileData);

    const directory = await this.directoryService.getDirectory(
      directoryId || 0,
      userId
    );

    const newFile: FileData = {
      key: file.key,
      name: file.name,
      size: file.size,
      type: file.type,
      ownerId: file.ownerId,
      numberOfDownloads: 0,
      directoryId: directoryId || 0,
      directory: directory as DirectoryData
    };

    const newKey = this.getFileLocation(newFile);

    const checkFileExists = await this.s3.checkObjectExists(key);
    if (!checkFileExists) throw new NotFoundError('file not found!');

    const checkNewFileExists = await this.s3.checkObjectExists(newKey);
    if (checkNewFileExists)
      throw new BadRequestError('file in directory exists');

    await this.s3.copyObject(key, newKey);

    return this.fileRepository.create(userId, {
      name: newFile.name,
      key: newFile.key,
      type: newFile.type,
      size: newFile.size,
      directoryId: newFile.directoryId
    });
  }

  leaderboardOfHotLinks(userId: number) {
    return this.fileRepository.getUserAllFilesSortByDownloads(userId);
  }

  getFileLocation(fileData: FileData): string {
    const pathSegments: string[] = [];
    let currentDir: DirectoryData | null = fileData.directory;

    // eslint-disable-next-line no-loops/no-loops
    while (currentDir) {
      pathSegments.unshift(currentDir.name);
      currentDir = currentDir.parentDir;
    }

    pathSegments.push(fileData.key);

    const fileLocation: string = pathSegments.join('/');

    return `${fileData.ownerId}/${fileLocation}`;
  }

  async downloadFile(userId: number, id: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    if (!file) throw new BadRequestError('File not found!');

    const key = this.getFileLocation(file as FileData);

    await this.fileRepository.incrementNumberOfDownloads(file.id);

    return this.s3.getObject(key);
  }

  async numberOfDownloads(userId: number, id: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    return { downloads: file?.numberOfDownloads };
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
      return { path: upload?.key };
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

  async uploadFiles(
    files: File | File[],
    userId: number,
    directoryId?: number
  ) {
    let directoryPath: any;

    if (directoryId) {
      const directory = await this.directoryService.getDirectory(
        directoryId,
        userId
      );

      directoryPath = this.directoryService.getDirectoryLocation(
        directory as DirectoryData
      );
    } else {
      directoryPath = null;
    }

    const upload = await this.s3.upload(files, userId, directoryPath);

    if (Array.isArray(upload)) {
      upload.forEach(async (file) => {
        const fileData: CreateFileDto = {
          size: file.size,
          key: file.key,
          type: file.type,
          name: file.name,
          directoryId: directoryId
        };

        await this.fileRepository.create(userId, fileData);
      });

      return upload.map((files) => files);
    } else {
      return { key: upload?.key };
    }
  }

  async renameFile(userId: number, fileId: number, newName: string) {
    const file = await this.fileRepository.findUserFileById(fileId, userId);
    if (!file) throw new BadRequestError('File Not Found!');

    const key = `${userId}/${file.key}`;
    const newNameKey = `${userId}/${newName}`;

    await this.s3.copyObject(key, newNameKey);
    await this.fileRepository.updateFileName(file.id, newName);
  }

  async removeFile(userId: number, id: number) {
    const file = await this.fileRepository.findUserFileById(id, userId);

    if (!file) throw new BadRequestError('File not found!');

    await this.s3.deleteObject(`${userId}/${file.key}`);

    return this.fileRepository.delete(file.id, userId);
  }
}

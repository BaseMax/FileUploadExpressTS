import { Service } from 'typedi';
import { S3ManagerService } from '../../infrastructure/services/s3-manager/s3.service';
import { DirectoryRepository } from './directory.repository';

@Service()
export class DirectoryService {
  constructor(
    private readonly s3: S3ManagerService,
    private readonly directoryRepository: DirectoryRepository
  ) {}

  async createDirectory(dirName: string, userId: number) {
    const upload = await this.s3.createDirectory(dirName, userId);
    await this.directoryRepository.create(dirName, userId);
    return upload;
  }
}

import { Service } from 'typedi';
import { S3ManagerService } from '../../infrastructure/services/s3-manager/s3.service';
import { DirectoryRepository } from './directory.repository';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { DirectoryData } from './interface/directory.interface';
import { BadRequestError } from 'routing-controllers';

@Service()
export class DirectoryService {
  constructor(
    private readonly s3: S3ManagerService,
    private readonly directoryRepository: DirectoryRepository
  ) {}

  async getDirectory(id: number, userId: number) {
    return this.directoryRepository.findById(+id, userId);
  }

  getDirectoryLocation(directory: DirectoryData): string {
    const pathSegments: string[] = [];
    let currentDir: DirectoryData | null = directory;

    // eslint-disable-next-line no-loops/no-loops
    while (currentDir) {
      pathSegments.unshift(currentDir.name);
      if (currentDir.parentDir != null) {
        currentDir = currentDir.parentDir;
      } else {
        break;
      }
    }

    const fileLocation: string = pathSegments.join('/');

    return `${fileLocation}`;
  }

  async createDirectory(userId: number, payload: CreateDirectoryDto) {
    let directoryName: string;

    if (payload.parentId) {
      const directory = await this.getDirectory(payload.parentId, userId);

      if (!directory) throw new BadRequestError('directory not found');

      const parentDirectory = this.getDirectoryLocation(
        directory as DirectoryData
      );

      directoryName = `${parentDirectory}/${payload.name}`;
    } else {
      directoryName = payload.name;
    }

    const upload = await this.s3.createDirectory(directoryName, userId);

    await this.directoryRepository.create(
      payload.name,
      userId,
      payload.parentId
    );

    return upload;
  }
}

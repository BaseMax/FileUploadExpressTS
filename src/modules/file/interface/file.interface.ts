import { DirectoryData } from '../../directory/interface/directory.interface';

export interface FileData {
  id?: number;
  key: string;
  name: string;
  size: number;
  type: string;
  ownerId: number;
  numberOfDownloads: number;
  directoryId: number;
  directory: DirectoryData;
}

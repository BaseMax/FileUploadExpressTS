export interface DirectoryData {
  id: number;
  name: string;
  ownerId: number;
  parentDirId: number | null;
  parentDir: DirectoryData | null;
}

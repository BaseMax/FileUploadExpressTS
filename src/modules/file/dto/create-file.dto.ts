export class CreateFileDto {
  name!: string;
  key!: string;
  type!: string;
  size!: number;
  directoryId?: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class RenameFileDto {
  @IsString()
  @IsNotEmpty()
  newName!: string;
}

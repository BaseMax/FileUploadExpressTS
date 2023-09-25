import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDirectoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}

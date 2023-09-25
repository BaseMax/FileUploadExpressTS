import { IsNumber, IsOptional } from 'class-validator';

export class TransformFileDto {
  @IsNumber()
  @IsOptional()
  directoryId?: number;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator';

export class UploadFromLinkDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsNumber()
  directoryId?: number;
}

import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UploadFromLinkDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url!: string;
}

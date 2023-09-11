import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}

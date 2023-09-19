import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { CustomMatchPasswords } from '../../../utils';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  currentPassword!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword!: string;

  @IsNotEmpty()
  @IsString()
  @Validate(CustomMatchPasswords, ['newPassword'])
  confirmationNewPassword!: string;
}

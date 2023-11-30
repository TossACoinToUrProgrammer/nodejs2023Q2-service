import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'old password must be a string' })
  oldPassword: string;

  @IsString({ message: 'new password must be a string' })
  newPassword: string;
}

import { IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken: string;
}

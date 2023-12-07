import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'Login must be a string' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  password: string;
}

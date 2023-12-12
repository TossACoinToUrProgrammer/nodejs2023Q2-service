import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsBoolean({ message: 'grammy must be a bool' })
  grammy: boolean;
}

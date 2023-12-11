import { IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsBoolean({ message: 'Grammy must be a bool' })
  grammy: boolean;
}

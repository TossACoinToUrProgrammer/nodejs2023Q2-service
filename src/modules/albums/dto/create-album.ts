import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNumber({}, { message: 'Grammy must be a number' })
  year: number;

  @IsString({ message: 'ArtistId must be a string or null' })
  @IsOptional()
  artistId: string | null;
}

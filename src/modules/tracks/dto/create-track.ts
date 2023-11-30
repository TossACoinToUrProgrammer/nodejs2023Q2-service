import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Artist id must be a string or null' })
  @IsOptional()
  artistId: string | null;

  @IsString({ message: 'Album id must be a string or null' })
  @IsOptional()
  albumId: string | null;

  @IsNumber({}, { message: 'Duration id must be a number' })
  duration: number;
}


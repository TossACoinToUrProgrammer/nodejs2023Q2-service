import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artist } from './entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorite } from '../favorites/entities/favorites.entity';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [TypeOrmModule.forFeature([Artist, Album, Track, Favorite])],
})
export class ArtistsModule {}

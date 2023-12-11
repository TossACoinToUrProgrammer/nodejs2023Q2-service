import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Favorite } from '../favorites/entities/favorites.entity';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [TypeOrmModule.forFeature([Track, Artist, Album, Favorite])],
})
export class TracksModule {}

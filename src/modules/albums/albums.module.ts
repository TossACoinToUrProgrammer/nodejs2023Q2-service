import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { Favorite } from '../favorites/entities/favorites.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TypeOrmModule.forFeature([Album, Favorite, Track])],
})
export class AlbumsModule {}

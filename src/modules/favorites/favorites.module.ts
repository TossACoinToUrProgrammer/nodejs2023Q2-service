import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorite } from './entities/favorites.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TypeOrmModule.forFeature([Track, Artist, Album, Favorite])],
})
export class FavoritesModule {
  constructor(private readonly favoritesService: FavoritesService) {}

  async onModuleInit() {
    await this.favoritesService.initializeFavorites();
  }
}

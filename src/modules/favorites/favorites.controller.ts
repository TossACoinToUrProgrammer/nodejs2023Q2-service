import { Controller, Get, Post, Param, Delete } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { UuidValidationPipe } from 'src/pipes/user-id-validation.pipe';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavs() {
    return this.favoritesService.getFavs();
  }

  @Post('/track/:id')
  addTrack(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  deleteTrack(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  deleteAlbum(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  deleteArtist(@Param('id', UuidValidationPipe) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}

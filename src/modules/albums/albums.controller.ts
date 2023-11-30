import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { UuidValidationPipe } from 'src/pipes/user-id-validation.pipe';
import { UpdateAlbumDto } from './dto/update-album';
import { CreateAlbumDto } from './dto/create-album';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAlbums() {
    return this.albumsService.getAlbums();
  }

  @Get('/:id')
  getAlbum(@Param('id', UuidValidationPipe) id: string) {
    return this.albumsService.getAlbum(id);
  }

  @Post()
  createAlbum(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put('/:id')
  updateAlbum(
    @Param('id', UuidValidationPipe) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete('/:id')
  deleteAlbum(@Param('id', UuidValidationPipe) id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}

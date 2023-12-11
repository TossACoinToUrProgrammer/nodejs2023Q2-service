import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';

import { UuidValidationPipe } from 'src/common/pipes/user-id-validation.pipe';
import { UpdateArtistDto } from './dto/update-artist';
import { CreateArtistDto } from './dto/create-artist';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getArtists() {
    return this.artistsService.getArtists();
  }

  @Get('/:id')
  getArtist(@Param('id', UuidValidationPipe) id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  createArtist(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put('/:id')
  updateArtist(
    @Param('id', UuidValidationPipe) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', UuidValidationPipe) id: string) {
    return this.artistsService.deleteArtist(id);
  }
}

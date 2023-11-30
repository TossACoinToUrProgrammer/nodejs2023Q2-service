import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UpdateArtistDto } from './dto/update-artist';
import { CreateArtistDto } from './dto/create-artist';
import {
  createArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from 'src/database/artists';

@Injectable()
export class ArtistsService {
  getArtists() {
    return getArtists();
  }

  getArtist(id: string) {
    const artist = getArtist(id);
    if (!artist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    createArtist(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updatedArtistDto: UpdateArtistDto) {
    let artist = getArtist(id);
    if (!artist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    artist = {
      id: artist.id,
      ...updatedArtistDto,
    };
    updateArtist(artist);
    return artist;
  }

  deleteArtist(id: string) {
    let artist = getArtist(id);
    if (!artist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    deleteArtist(id);
    return { message: 'Artist deleted' };
  }
}

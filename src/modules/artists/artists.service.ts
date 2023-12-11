import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateArtistDto } from './dto/update-artist';
import { CreateArtistDto } from './dto/create-artist';
import { Artist } from './entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorite } from '../favorites/entities/favorites.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
  ) {}

  async getArtists() {
    return this.artistRepository.find();
  }

  async getArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(newArtist);
  }

  async updateArtist(id: string, updatedArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const updatedArtist = await this.artistRepository.merge(
      artist,
      updatedArtistDto,
    );
    return await this.artistRepository.save(updatedArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.albumRepository
      .createQueryBuilder()
      .update(Album)
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId: id })
      .execute();

    await this.trackRepository
      .createQueryBuilder()
      .update(Track)
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId: id })
      .execute();

    await this.favoritesRepository
      .createQueryBuilder()
      .update(Favorite)
      .set({
        artists: () => `array_remove("artists", '${id}')`,
      })
      .execute();

    await this.artistRepository.remove(artist);
    return { message: 'Artist deleted' };
  }
}

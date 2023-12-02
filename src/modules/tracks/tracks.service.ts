import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateTrackDto } from './dto/update-track';
import { CreateTrackDto } from './dto/create-track';
import { Track } from './entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { checkById } from 'src/helpers/checkById';
import { Favorite } from '../favorites/entities/favorites.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
  ) {}

  async getTracks() {
    return this.trackRepository.find();
  } 

  async getTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;
    if (artistId) {
      await checkById(
        artistId,
        this.artistRepository,
        'Invalid artistId. Artist with such id doesnt exist',
      );
    }
    if (albumId) {
      await checkById(
        albumId,
        this.albumRepository,
        'Invalid albumId. Album with such id doesnt exist',
      );
    }
    const newTrack = this.trackRepository.create(createTrackDto);
    return this.trackRepository.save(newTrack);
  }

  async updateTrack(id: string, updatedTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const { artistId, albumId } = updatedTrackDto;
    if (artistId) {
      await checkById(
        artistId,
        this.artistRepository,
        'Invalid artistId. Artist with such id doesnt exist',
      );
    }
    if (albumId) {
      await checkById(
        albumId,
        this.albumRepository,
        'Invalid albumId. Album with such id doesnt exist',
      );
    }

    const updatedTrack = await this.trackRepository.merge(
      track,
      updatedTrackDto,
    );
    return await this.trackRepository.save(updatedTrack);
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.favoritesRepository
      .createQueryBuilder()
      .update(Favorite)
      .set({
        tracks: () => `array_remove("tracks", '${id}')`,
      })
      .execute();

    await this.trackRepository.remove(track);
    return { message: 'Track deleted' };
  }
}

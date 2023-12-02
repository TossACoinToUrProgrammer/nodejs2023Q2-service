import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateAlbumDto } from './dto/update-album';
import { CreateAlbumDto } from './dto/create-album';
import { Album } from './entities/album.entity';
import { checkById } from 'src/helpers/checkById';
import { Favorite } from '../favorites/entities/favorites.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAlbums() {
    return this.albumRepository.find();
  }

  async getAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId) {
      await checkById(
        createAlbumDto.artistId,
        this.albumRepository,
        'Invalid artistId. Artist with such id doesnt exist',
      );
    }
    const newTrack = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(newTrack);
  }

  async updateAlbum(id: string, updatedAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (updatedAlbumDto.artistId) {
      await checkById(
        updatedAlbumDto.artistId,
        this.albumRepository,
        'Invalid artistId. Artist with such id doesnt exist',
      );
    }

    const updatedTrack = await this.albumRepository.merge(
      album,
      updatedAlbumDto,
    );
    return await this.albumRepository.save(updatedTrack);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.trackRepository
      .createQueryBuilder()
      .update(Track)
      .set({ albumId: null })
      .where('albumId = :albumId', { albumId: id })
      .execute();

    await this.favoritesRepository
      .createQueryBuilder()
      .update(Favorite)
      .set({
        albums: () => `array_remove("albums", '${id}')`,
      })
      .execute();

    await this.albumRepository.remove(album);
    return { message: 'Album deleted' };
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  IFavorites,
  IFavoritesResponse,
} from 'src/models/favorites/interfaces';
import { Favorite } from './entities/favorites.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { checkById } from 'src/common/helpers/checkById';

@Injectable()
export class FavoritesService {
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

  async initializeFavorites() {
    const existingFavorites = await this.favoritesRepository.findOneBy({
      id: 'favs',
    });

    if (existingFavorites) {
      return existingFavorites;
    }

    const newFavorites = this.favoritesRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });
    return this.favoritesRepository.save(newFavorites);
  }

  async getFavs() {
    const favs = await this.favoritesRepository.findOneBy({ id: 'favs' });

    const mappedFavs = {};

    for (const key in favs) {
      if (key === 'artists') {
        const promises = favs[key].map(
          async (id) => await this.artistRepository.findOneBy({ id }),
        );
        mappedFavs[key] = await Promise.all(promises);
      }
      if (key === 'albums') {
        const promises = favs[key].map(
          async (id) => await this.albumRepository.findOneBy({ id }),
        );
        mappedFavs[key] = await Promise.all(promises);
      }
      if (key === 'tracks') {
        const promises = favs[key].map(
          async (id) => await this.trackRepository.findOneBy({ id }),
        );
        mappedFavs[key] = await Promise.all(promises);
      }
    }

    return mappedFavs as IFavoritesResponse;
  }

  async addTrack(id: string) {
    return await this.addItemToFavs(
      'tracks',
      id,
      'Track was added to favorites',
    );
  }

  async deleteTrack(id: string) {
    return await this.deleteItemFromFavs(
      'tracks',
      id,
      'Track has been deleted',
    );
  }

  async addAlbum(id: string) {
    return await this.addItemToFavs(
      'albums',
      id,
      'Album was added to favorites',
    );
  }

  async deleteAlbum(id: string) {
    return await this.deleteItemFromFavs(
      'albums',
      id,
      'Album has been deleted',
    );
  }

  async addArtist(id: string) {
    return await this.addItemToFavs(
      'artists',
      id,
      'Artist was added to favorites',
    );
  }

  async deleteArtist(id: string) {
    return await this.deleteItemFromFavs(
      'artists',
      id,
      'Artist has been deleted',
    );
  }

  async addItemToFavs(key: keyof IFavorites, itemId: string, message: string) {
    let repository: Repository<Artist | Track | Album>;
    if (key === 'tracks') repository = this.trackRepository;
    if (key === 'albums') repository = this.albumRepository;
    if (key === 'artists') repository = this.artistRepository;

    await checkById(itemId, repository, 'Item with provided id doesnt exist');

    const favs = await this.favoritesRepository.findOneBy({ id: 'favs' });
    if (favs[key].includes(itemId)) {
      throw new HttpException(
        `There is already such id in Favorites.${key}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedFavs = await this.favoritesRepository.merge(favs, {
      [key]: [...favs[key], itemId],
    });
    await this.favoritesRepository.save(updatedFavs);
    return { message };
  }

  async deleteItemFromFavs(
    key: keyof IFavorites,
    itemId: string,
    message: string,
  ) {
    const favs = await this.favoritesRepository.findOneBy({ id: 'favs' });
    if (!favs[key].includes(itemId)) {
      throw new HttpException(
        `There is no item with such id in Favorites.${key}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const updatedFavs = await this.favoritesRepository.merge(favs, {
      [key]: favs[key].filter((el) => el !== itemId),
    });
    await this.favoritesRepository.save(updatedFavs);
    return { message };
  }
}

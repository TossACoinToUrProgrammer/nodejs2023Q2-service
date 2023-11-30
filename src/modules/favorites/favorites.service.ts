import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { getAlbum } from 'src/database/albums';
import { getArtist } from 'src/database/artists';
import {
  addToFavs,
  deleteFromFavs,
  getFavorites,
  getItem,
} from 'src/database/favoritest';
import { getTrack } from 'src/database/tracks';
import { Favorites, FavoritesResponse } from 'src/models/favorites/interfaces';

@Injectable()
export class FavoritesService {
  getFavs() {
    const favs = getFavorites();
    let mappedFavs = {};

    for (const key in favs) {
      if (key === 'artists') {
        mappedFavs[key] = favs[key].map((id) => getArtist(id));
      }
      if (key === 'albums') {
        mappedFavs[key] = favs[key].map((id) => getAlbum(id));
      }
      if (key === 'tracks') {
        mappedFavs[key] = favs[key].map((id) => getTrack(id));
      }
    }

    return mappedFavs as FavoritesResponse;
  }

  addTrack(id: string) {
    return this.addItemToFavs(
      'tracks',
      id,
      'Track has been added to favorites',
    );
  }

  deleteTrack(id: string) {
    return this.deleteItemFromFavs(
      'tracks',
      id,
      'Track has been deleted from favorites',
    );
  }

  addAlbum(id: string) {
    return this.addItemToFavs(
      'albums',
      id,
      'Album has been added to favorites',
    );
  }

  deleteAlbum(id: string) {
    return this.deleteItemFromFavs(
      'albums',
      id,
      'Album has been deleted from favorites',
    );
  }

  addArtist(id: string) {
    return this.addItemToFavs(
      'artists',
      id,
      'Artist has been added to favorites',
    );
  }

  deleteArtist(id: string) {
    return this.deleteItemFromFavs(
      'artists',
      id,
      'Artist has been deleted from favorites',
    );
  }

  addItemToFavs(key: keyof Favorites, itemId: string, message: string) {
    const getFuncs: Record<keyof Favorites, Function> = {
      artists: getTrack,
      tracks: getTrack,
      albums: getAlbum,
    };

    if (!getFuncs[key](itemId)) {
      throw new HttpException(
        'Record with provided id doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    addToFavs(key, itemId);
    return { message };
  }

  deleteItemFromFavs(key: keyof Favorites, itemId: string, message: string) {
    if (!getItem(key, itemId)) {
      throw new HttpException(
        `Record with provided id not found in ${key}`,
        HttpStatus.NOT_FOUND,
      );
    }
    deleteFromFavs(key, itemId);
    return { message };
  }
}

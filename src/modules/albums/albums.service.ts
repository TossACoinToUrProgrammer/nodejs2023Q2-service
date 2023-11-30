import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UpdateAlbumDto } from './dto/update-album';
import { CreateAlbumDto } from './dto/create-album';
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from 'src/database/albums';

@Injectable()
export class AlbumsService {
  getAlbums() {
    return getAlbums();
  }

  getAlbum(id: string) {
    const album = getAlbum(id);
    if (!album) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    createAlbum(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updatedAlbumDto: UpdateAlbumDto) {
    let album = getAlbum(id);
    if (!album) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    album = {
      id: album.id,
      ...updatedAlbumDto,
    };
    updateAlbum(album);
    return album;
  }

  deleteAlbum(id: string) {
    let album = getAlbum(id);
    if (!album) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    deleteAlbum(id);
    return { message: 'Album deleted' };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UpdateTrackDto } from './dto/update-track';
import { CreateTrackDto } from './dto/create-track';
import {
  createTrack,
  deleteTrack,
  getTrack,
  getTracks,
  updateTrack,
} from 'src/database/tracks';

@Injectable()
export class TracksService {
  getTracks() {
    return getTracks();
  }

  getTrack(id: string) {
    const track = getTrack(id);
    if (!track) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      ...createTrackDto,
    };
    createTrack(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updatedTrackDto: UpdateTrackDto) {
    let track = getTrack(id);
    if (!track) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    track = {
      id: track.id,
      ...updatedTrackDto,
    };
    updateTrack(track);
    return track;
  }

  deleteTrack(id: string) {
    let track = getTrack(id);
    if (!track) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    deleteTrack(id);
    return { message: 'Track deleted' };
  }
}

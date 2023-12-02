import { IAlbum } from '../albums/interfaces';
import { IArtist } from '../artists/interfaces';
import { ITrack } from '../tracks/interfaces';

export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

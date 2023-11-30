import { Album } from '../albums/interfaces';
import { Artist } from '../artists/interfaces';
import { Track } from '../tracks/interfaces';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

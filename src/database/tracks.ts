import { Track } from 'src/models/tracks/interfaces';

let tracks: Track[] = [
  {
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d4',
    name: 'Track test',
    artistId: null,
    albumId: null,
    duration: 420,
  },
  {
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d5',
    name: 'Track test 22',
    artistId: null,
    albumId: null,
    duration: 123,
  },
];

export const getTracks = () => {
  return tracks;
};

export const getTrack = (id: string) => {
  return tracks.find((el) => el.id === id);
};

export const createTrack = (track: Track) => {
  tracks.unshift(track);
};

export const updateTrack = (updatedTrack: Track) => {
  tracks = tracks.map((el) => (el.id === updatedTrack.id ? updatedTrack : el));
};

export const deleteTrack = (id: string) => {
  tracks = tracks.filter((el) => el.id !== id);
};

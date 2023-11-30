import { Artist } from 'src/models/artists/interfaces';

let artists: Artist[] = [
  {
    id: 'dc52f067-99d1-46e0-a42c-49c142af26f2',
    name: 'Jorell',
    grammy: false,
  },
  {
    id: 'dc52f067-99d1-46e0-a42c-49c142af26f1',
    name: 'Ronald',
    grammy: true,
  },
];

export const getArtists = () => {
  return artists;
};

export const getArtist = (id: string) => {
  return artists.find((el) => el.id === id);
};

export const createArtist = (artist: Artist) => {
  artists.unshift(artist);
};

export const updateArtist = (updatedArtist: Artist) => {
  artists = artists.map((el) =>
    el.id === updatedArtist.id ? updatedArtist : el,
  );
};

export const deleteArtist = (id: string) => {
  artists = artists.filter((el) => el.id !== id);
};

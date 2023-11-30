import { Album } from 'src/models/albums/interfaces';

let albums: Album[] = [
  {
    id: 'dc52f067-99d1-46e0-a42c-49c142af26f8',
    name: 'New album',
    year: 2020,
    artistId: null,
  },
  {
    id: 'dc52f067-99d1-46e0-a42c-49c142af26f0',
    name: 'New album 22',
    year: 2001,
    artistId: null,
  },
];

export const getAlbums = () => {
  return albums;
};

export const getAlbum = (id: string) => {
  return albums.find((el) => el.id === id);
};

export const createAlbum = (album: Album) => {
  albums.unshift(album);
};

export const updateAlbum = (updatedAlbum: Album) => {
  albums = albums.map((el) => (el.id === updatedAlbum.id ? updatedAlbum : el));
};

export const deleteAlbum = (id: string) => {
  albums = albums.filter((el) => el.id !== id);
};

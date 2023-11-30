import { Favorites } from 'src/models/favorites/interfaces';

let favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

export const getFavorites = () => {
  return favorites;
};

export const addToFavs = (key: keyof Favorites, entityId: string) => {
  favorites[key].push(entityId);
};

export const deleteFromFavs = (key: keyof Favorites, entityId: string) => {
  favorites[key] = favorites[key].filter((id) => entityId !== id);
};

export const getItem = (key: keyof Favorites, itemId: string) => {
  return favorites[key].find((id) => id === itemId);
};

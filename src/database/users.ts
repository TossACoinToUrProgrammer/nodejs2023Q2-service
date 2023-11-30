import { User } from 'src/models/users/interfaces';

let users: User[] = [
  {
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    login: 'string',
    password: 'string',
    version: 1,
    createdAt: 11111,
    updatedAt: 11111,
  },
  {
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d2',
    login: 'string2',
    password: 'string2',
    version: 1,
    createdAt: 11111,
    updatedAt: 11111,
  },
];

export const getUsers = () => {
  return users;
};

export const getUser = (id: string) => {
  return users.find((el) => el.id === id);
};

export const createUser = (user: User) => {
  users.unshift(user);
};

export const updatePassword = (updatedUser: User) => {
  users = users.map((el) => (el.id === updatedUser.id ? updatedUser : el));
};

export const deleteUser = (id: string) => {
  users = users.filter((el) => el.id !== id);
};

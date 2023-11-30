import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updatePassword,
} from 'src/database/users';
import { CreateUserDto } from './dto/create-user';
import { UpdatePasswordDto } from './dto/update-password';

@Injectable()
export class UsersService {
  getUsers() {
    return getUsers().map(({ password, ...user }) => user);
  }

  getUser(id: string) {
    const user = getUser(id);
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const { password, ...response } = user;
    return response;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    createUser(newUser);
    const { password, ...response } = newUser;
    return response;
  }

  updatePassword(id: string, updatedPasswordDto: UpdatePasswordDto) {
    let user = getUser(id);
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (user.password !== updatedPasswordDto.oldPassword)
      throw new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);

    user = {
      ...user,
      password: updatedPasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    updatePassword(user);

    const { password, ...response } = user;
    return response;
  }

  deleteUser(id: string) {
    let user = getUser(id);
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    deleteUser(id);
    return { message: 'User deleted' };
  }
}

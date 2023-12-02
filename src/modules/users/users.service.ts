import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user';
import { UpdatePasswordDto } from './dto/update-password';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map(({ password, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const { password, ...response } = user;
    return response;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async updatePassword(id: string, updatedPasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (user.password !== updatedPasswordDto.oldPassword)
      throw new HttpException('Wrong password provided', HttpStatus.FORBIDDEN);

    const mergeResponse = await this.userRepository.merge(user, {
      password: updatedPasswordDto.newPassword,
    });
    const updatedUser = await this.userRepository.save(mergeResponse);
    const { password, ...response } = updatedUser;
    return response;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    await this.userRepository.remove(user);
    return { message: 'User deleted' };
  }
}

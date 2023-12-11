import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/entities/user.entity';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpires = Number(process.env.ACCESS_TOKEN_EXPIRES);
const refreshTokenExpires = Number(process.env.REFRESH_TOKEN_EXPIRES);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createAuthDto: CreateAuthDto) {
    const user = await this.userRepository.findOneBy({
      login: createAuthDto.login,
    });
    if (user)
      throw new HttpException(
        'User with this login already exists',
        HttpStatus.BAD_REQUEST,
      );

    const hashedPass = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = await this.userRepository.create({
      login: createAuthDto.login,
      password: hashedPass,
    });
    return this.userRepository.save(newUser);
  }

  async login(createAuthDto: CreateAuthDto, res) {
    const user = await this.userRepository.findOneBy({
      login: createAuthDto.login,
    });
    if (!user) throw new HttpException('User not found', HttpStatus.FORBIDDEN);

    const passMatch = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );
    if (!passMatch)
      throw new HttpException('Wrong credentials', HttpStatus.FORBIDDEN);

    const payload = { userId: user.id, login: user.login };
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenExpires,
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenExpires,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      path: '/auth/refresh',
      maxAge: refreshTokenExpires * 1000,
    });
    res.cookie('access_token', accessToken, {
      maxAge: accessTokenExpires * 1000,
    }); // maxAge is in milliseconds

    return { message: 'Successfully logged in' };
  }

  async refresh(refreshTokenDto: RefreshAuthDto, res) {
    let refreshPayload;
    try {
      refreshPayload = jwt.verify(
        refreshTokenDto.refreshToken,
        refreshTokenSecret,
      );
    } catch (error) {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }

    const accessToken = jwt.sign(refreshPayload, accessTokenSecret, {
      expiresIn: accessTokenExpires,
    });
    const refreshToken = jwt.sign(refreshPayload, refreshTokenSecret, {
      expiresIn: refreshTokenExpires,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      path: '/auth/refresh',
      maxAge: refreshTokenExpires * 1000,
    });
    res.cookie('access_token', accessToken, {
      maxAge: accessTokenExpires * 1000,
    }); // maxAge is in milliseconds

    return { message: 'Tokens refreshed' };
  }
}

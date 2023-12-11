import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  HttpCode
} from '@nestjs/common';

import { UuidValidationPipe } from 'src/common/pipes/user-id-validation.pipe';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { UpdatePasswordDto } from './dto/update-password';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id', UuidValidationPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put('/:id')
  updatePassword(
    @Param('id', UuidValidationPipe) id: string,
    @Body(new ValidationPipe()) updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id', UuidValidationPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

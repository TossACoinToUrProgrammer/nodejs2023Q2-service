import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @Post('/login')
  login(
    @Body(new ValidationPipe()) createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.login(createAuthDto, res);
  }

  @Post('/refresh')
  refresh(
    @Body() refreshToken: RefreshAuthDto,
    @Res({ passthrough: true }) res,
  ) {
    if (!refreshToken) throw new UnauthorizedException();
    return this.authService.refresh(refreshToken, res);
  }
}

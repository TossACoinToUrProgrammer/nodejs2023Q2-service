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
import { UpdateTrackDto } from './dto/update-track';
import { CreateTrackDto } from './dto/create-track';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getTracks() {
    return this.tracksService.getTracks();
  }

  @Get('/:id')
  getTrack(@Param('id', UuidValidationPipe) id: string) {
    return this.tracksService.getTrack(id);
  }

  @Post()
  createTrack(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto) {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put('/:id')
  updateTrack(
    @Param('id', UuidValidationPipe) id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', UuidValidationPipe) id: string) {
    return this.tracksService.deleteTrack(id);
  }
}

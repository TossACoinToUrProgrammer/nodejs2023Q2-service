import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { UuidValidationPipe } from 'src/pipes/user-id-validation.pipe';
import { UpdateTrackDto } from './dto/update-track';
import { CreateTrackDto } from './dto/create-track';
import { TracksService } from './tracks.service';

@Controller('tracks')
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
  deleteTrack(@Param('id', UuidValidationPipe) id: string) {
    return this.tracksService.deleteTrack(id);
  }
}

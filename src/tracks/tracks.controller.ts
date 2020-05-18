import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Listening } from 'src/listenings/listening.entity';
import { ListeningsService } from 'src/listenings/listenings.service';
import { UsersService } from 'src/users/users.service';

import { CreateTrackDTO } from './dto/create-track.dto';
import { FindTrackDTO } from './dto/find-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { Track } from './track.entity';
import { TracksService } from './tracks.service';
import { FindListeningsDTO } from 'src/listenings/dto/find-listenings.dto';
import { FindLastListengsForTrackDTO } from 'src/listenings/dto/find-last-listenings-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly usersService: UsersService,
    private readonly listeningsService: ListeningsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() track: CreateTrackDTO): Promise<Track> {
    return await this.tracksService.create(new Track(track));
  }

  @Get()
  async find(): Promise<Track[]> {
    return this.tracksService.find();
  }

  @Get(':id')
  async findOne(@Param() track: FindTrackDTO): Promise<Track> {
    return await this.tracksService.findOne(track);
  }

  @Get(':id/stats')
  async findStats(@Param() findTrackDTO: FindTrackDTO, @Query() findListeningsDTO: FindListeningsDTO) {
    return await this.listeningsService.find(findTrackDTO, findListeningsDTO)
  }

  @Get(':id/stats/last/:count/:period')
  async findLastStats(@Param() findLastListengsForTrackDTO: FindLastListengsForTrackDTO) {
    return await this.listeningsService.findLast(findLastListengsForTrackDTO)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param() track: FindTrackDTO, @Body() trackData: UpdateTrackDTO): Promise<Track> {
    await this.tracksService.update(track, trackData);
    return await this.tracksService.findOne(track);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/listen')
  async listen(@Param() findTrackDTO: FindTrackDTO, @Request() req): Promise<void> {
    const user = await this.usersService.findOne(req.user);
    const track = await this.tracksService.findOne(findTrackDTO);
    const listening = new Listening({ user: user, track: track })
    await this.listeningsService.create(listening);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() track: FindTrackDTO): void {
    this.tracksService.delete(track);
  }
}

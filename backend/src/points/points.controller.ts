import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePointDto } from './create-point.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  findAll() {
    return this.pointsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPointDto: CreatePointDto, @Req() request: any) {
    return this.pointsService.create(createPointDto, request.user.sub);
  }
}
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePointDto } from './create-point.dto';
import { PointsService } from './points.service';
import { UpdatePointDto } from './update-point.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  findAll() {
    return this.pointsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending')
  findPending(@Req() request: any) {
    if (request.user.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    return this.pointsService.findPending();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPointDto: CreatePointDto, @Req() request: any) {
    return this.pointsService.create(createPointDto, request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyPoints(@Req() request: any) {
    return this.pointsService.findByUser(request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body('status') status: 'approved' | 'rejected',
    @Req() request: any,
  ) {
    if (request.user.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    if (!['approved', 'rejected'].includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    return this.pointsService.changeStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePointDto: UpdatePointDto,
    @Req() request: any,
  ) {
    return this.pointsService.update(id, updatePointDto, request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any) {
    return this.pointsService.remove(id, request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/points',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;

          callback(null, uniqueName);
        },
      }),
    }),
  )

  @UseGuards(JwtAuthGuard)
  @Delete(':id/images')
  removePointImage(
    @Param('id') id: string,
    @Body('imageUrl') imageUrl: string,
    @Req() request: any,
  ) {
    return this.pointsService.removeImage(
      id,
      request.user.sub,
      imageUrl,
    );
  }

  async uploadPointImage(
    @Param('id') id: string,
    @Req() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const imageUrl = `http://localhost:3000/uploads/points/${file.filename}`;

    return this.pointsService.addImage(id, request.user.sub, imageUrl);
  }
}
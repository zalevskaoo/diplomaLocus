import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';

@Controller('points/:pointId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findByPoint(@Param('pointId') pointId: string) {
    return this.reviewsService.findByPoint(pointId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads/reviews',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;

          callback(null, uniqueName);
        },
      }),
    }),
  )
  create(
    @Param('pointId') pointId: string,
    @Req() request: any,
    @Body('text') text: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!text?.trim()) {
      throw new BadRequestException('Review text is required');
    }

    const imageUrls =
      files?.map(
        (file) =>
          `http://192.168.0.102:3000/uploads/reviews/${file.filename}`,
      ) ?? [];

    return this.reviewsService.create(
      pointId,
      request.user.sub,
      text,
      imageUrls,
    );
  }
}
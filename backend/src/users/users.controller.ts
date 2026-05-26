import {
  BadRequestException,
  Body,
  Controller,
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
import { CreateUserDto } from './create-user.dto';
import { UpdateProfileDto } from './update-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Req() request: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(request.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;

          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadAvatar(
    @Req() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Avatar file is required');
    }

    const avatarUrl = `http://localhost:3000/uploads/avatars/${file.filename}`;

    return this.usersService.updateProfile(request.user.sub, {
      avatarUrl,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/saved-points/:pointId')
  toggleSavedPoint(
    @Req() request: any,
    @Param('pointId') pointId: string,
  ) {
    return this.usersService.toggleSavedPoint(request.user.sub, pointId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saved-points')
  getSavedPointIds(@Req() request: any) {
    return this.usersService.getSavedPointIds(request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/saved-users/:userId')
  toggleSavedUser(
    @Req() request: any,
    @Param('userId') userId: string,
  ) {
    return this.usersService.toggleSavedUser(request.user.sub, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/saved-users')
  getSavedUsers(@Req() request: any) {
    return this.usersService.getSavedUsers(request.user.sub);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
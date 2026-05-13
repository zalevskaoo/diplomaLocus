import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePointDto } from './create-point.dto';
import { Point } from './point.schema';

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name)
    private readonly pointModel: Model<Point>,
  ) {}

  create(createPointDto: CreatePointDto, userId?: string) {
    return this.pointModel.create({
      ...createPointDto,
      createdBy: userId,
    });
  }

  findAll() {
    return this.pointModel.find().sort({ createdAt: -1 });
  }
}
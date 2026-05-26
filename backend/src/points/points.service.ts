import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../users/user.schema';
import { CreatePointDto } from './create-point.dto';
import { Point } from './point.schema';
import { UpdatePointDto } from './update-point.dto';

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name)
    private readonly pointModel: Model<Point>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createPointDto: CreatePointDto, userId?: string) {
    return this.pointModel.create({
      ...createPointDto,
      createdBy: userId,
      status: 'pending',
    });
  }

  async findAll() {
    const points = await this.pointModel
      .find({ status: 'approved' })
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      points.map(async (point) => {
        const objectPoint = point.toObject();

        if (!objectPoint.createdBy) {
          return {
            ...objectPoint,
            author: null,
          };
        }

        const author = await this.userModel
          .findById(objectPoint.createdBy)
          .select('name email avatarUrl bio');

        return {
          ...objectPoint,
          author: author
            ? {
                id: author._id,
                name: author.name,
                email: author.email,
                avatarUrl: author.avatarUrl,
                bio: author.bio,
              }
            : null,
        };
      }),
    );

    return result;
  }

  async update(id: string, updatePointDto: UpdatePointDto, userId: string) {
    const point = await this.pointModel.findById(id);

    if (!point) {
      throw new NotFoundException('Point not found');
    }

    if (point.createdBy !== userId) {
      throw new ForbiddenException('You can update only your own points');
    }

    return this.pointModel.findByIdAndUpdate(id, updatePointDto, {
      returnDocument: 'after',
    });
  }

  async remove(id: string, userId: string) {
    const point = await this.pointModel.findById(id);

    if (!point) {
      throw new NotFoundException('Point not found');
    }

    if (point.createdBy !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.pointModel.findByIdAndDelete(id);
  }

  async findByUser(userId: string) {
    return this.pointModel.find({ createdBy: userId }).sort({ createdAt: -1 });
  }

  async addImage(pointId: string, userId: string, imageUrl: string) {
    const point = await this.pointModel.findById(pointId);

    if (!point) {
      throw new NotFoundException('Point not found');
    }

    if (point.createdBy !== userId) {
      throw new ForbiddenException('Access denied');
    }

    if (point.imageUrls.length >= 5) {
      throw new BadRequestException('Maximum 5 images allowed');
    }

    return this.pointModel.findByIdAndUpdate(
      pointId,
      { $push: { imageUrls: imageUrl } },
      { returnDocument: 'after' },
    );
  }

  async removeImage(pointId: string, userId: string, imageUrl: string) {
  if (!imageUrl) {
    throw new BadRequestException('Image URL is required');
  }

  const point = await this.pointModel.findById(pointId);

  if (!point) {
    throw new NotFoundException('Point not found');
  }

  if (point.createdBy !== userId) {
    throw new ForbiddenException('Access denied');
  }

  return this.pointModel.findByIdAndUpdate(
    pointId,
    { $pull: { imageUrls: imageUrl } },
    { returnDocument: 'after' },
  );
}

  async findPending() {
  return this.pointModel
    .find({ status: 'pending' })
    .sort({ createdAt: -1 });
}

async changeStatus(
  pointId: string,
  status: 'approved' | 'rejected',
) {
  const point = await this.pointModel.findByIdAndUpdate(
    pointId,
    { status },
    { returnDocument: 'after' },
  );

  if (!point) {
    throw new NotFoundException('Point not found');
  }

  return point;
}
}
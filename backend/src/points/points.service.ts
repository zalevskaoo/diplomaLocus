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

  async findAll(mode?: string) {
    if (mode === 'mobile') {
      return this.findMobilePoints();
    }

    return this.findFullPoints();
  }

  private async findFullPoints() {
    const points = await this.pointModel
      .find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email avatarUrl bio');

    return points.map((point: any) => {
      const objectPoint = point.toObject();

      return {
        ...objectPoint,
        author: objectPoint.createdBy
          ? {
              id: objectPoint.createdBy._id,
              name: objectPoint.createdBy.name,
              email: objectPoint.createdBy.email,
              avatarUrl: objectPoint.createdBy.avatarUrl,
              bio: objectPoint.createdBy.bio,
            }
          : null,
        createdBy: objectPoint.createdBy?._id ?? objectPoint.createdBy,
      };
    });
  }

  private async findMobilePoints() {
    const categories = [
      'accessibility',
      'aid',
      'recycling',
      'sorting',
      'shelter',
      'invincibility',
    ];

    const regularGroups = await Promise.all(
      categories.map((category) =>
        this.pointModel.aggregate([
          {
            $match: {
              status: 'approved',
              category,
              type: { $ne: 'path' },
            },
          },
          {
            $sample: {
              size: 20,
            },
          },
        ]),
      ),
    );

    const bikeLanes = await this.pointModel.aggregate([
      {
        $match: {
          status: 'approved',
          category: 'bike_lane',
          type: 'path',
        },
      },
      {
        $sample: {
          size: 20,
        },
      },
    ]);

    const rawPoints = [...regularGroups.flat(), ...bikeLanes];

    const points = await this.pointModel.populate(rawPoints, {
      path: 'createdBy',
      select: 'name email avatarUrl bio',
    });

    return points.map((point: any) => ({
      ...point,
      author: point.createdBy
        ? {
            id: point.createdBy._id,
            name: point.createdBy.name,
            email: point.createdBy.email,
            avatarUrl: point.createdBy.avatarUrl,
            bio: point.createdBy.bio,
          }
        : null,
      createdBy: point.createdBy?._id ?? point.createdBy,
    }));
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

  async changeStatus(pointId: string, status: 'approved' | 'rejected') {
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
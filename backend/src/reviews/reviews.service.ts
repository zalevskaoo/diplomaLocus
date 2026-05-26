import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../users/user.schema';
import { Review, ReviewDocument } from './review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    pointId: string,
    userId: string,
    text: string,
    imageUrls: string[],
  ) {
    if (!text?.trim()) {
      throw new BadRequestException('Текст відгуку обов’язковий');
    }

    if (imageUrls.length > 5) {
      throw new BadRequestException('Можна додати максимум 5 фото');
    }

    return this.reviewModel.create({
      pointId,
      userId,
      text: text.trim(),
      imageUrls,
    });
  }

  async findByPoint(pointId: string) {
    const reviews = await this.reviewModel
      .find({ pointId })
      .sort({ createdAt: -1 });

    return Promise.all(
      reviews.map(async (review) => {
        const objectReview = review.toObject();

        const author = await this.userModel
          .findById(objectReview.userId)
          .select('name email avatarUrl bio');

        return {
          ...objectReview,
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
  }
}
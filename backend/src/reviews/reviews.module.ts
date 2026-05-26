import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/user.schema';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewSchema } from './review.schema';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kyiv-access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
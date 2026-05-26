import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PointsModule } from './points/points.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule, UsersModule, AuthModule, PointsModule, ReviewsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
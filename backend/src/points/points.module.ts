import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { Point, PointSchema } from './point.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kyiv-access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: Point.name, schema: PointSchema }]),
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
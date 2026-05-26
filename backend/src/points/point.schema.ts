import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PointDocument = HydratedDocument<Point>;

@Schema({ timestamps: true })
export class Point {
  @Prop({ required: true })
  title!: string;

  @Prop({
    required: true,
    enum: [
      'accessibility',
      'bike_line',
      'aid',
      'recycling',
      'sorting',
      'shelter',
      'invincibility',
    ],
  })
  category!: string;

  @Prop({
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status!: string;

  @Prop({
    required: true,
    enum: ['point', 'path'],
    default: 'point',
  })
  type!: string;

  @Prop({
    type: [
      {
        latitude: Number,
        longitude: Number,
      },
    ],
    default: [],
  })
  path!: {
    latitude: number;
    longitude: number;
  }[];

  @Prop({ required: true })
  address!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  latitude!: number;

  @Prop({ required: true })
  longitude!: number;

  @Prop()
  createdBy?: string;

  @Prop({ type: [String], default: [] })
  imageUrls!: string[];


}

export const PointSchema = SchemaFactory.createForClass(Point);
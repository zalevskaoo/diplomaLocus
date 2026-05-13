import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PointDocument = HydratedDocument<Point>;

@Schema({ timestamps: true })
export class Point {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  category!: string;

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
}

export const PointSchema = SchemaFactory.createForClass(Point);
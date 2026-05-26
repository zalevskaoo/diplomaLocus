import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  pointId!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ type: [String], default: [] })
  imageUrls!: string[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
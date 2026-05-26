import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    required: true,
    enum: ['user', 'admin'],
    default: 'user',})
  role!: string;

  @Prop({ default: '' })
  avatarUrl!: string;

  @Prop({ default: '' })
  bio!: string;

  @Prop({ type: [String], default: [] })
  savedPointIds!: string[];


  @Prop({ type: [String], default: [] })
  friendUserIds!: string[];

  @Prop({ default: false })
  isEmailVerified!: boolean;

  @Prop()
  emailVerificationToken?: string;

  @Prop()
  emailVerificationExpires?: Date;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from './create-user.dto';
import { UpdateProfileDto } from './update-profile.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto & Partial<User>) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findByVerificationToken(token: string) {
    return this.userModel.findOne({
      emailVerificationToken: token,
    });
  }

  async verifyEmail(userId: string) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          isEmailVerified: true,
          $unset: {
            emailVerificationToken: '',
            emailVerificationExpires: '',
          },
        },
        { returnDocument: 'after' },
      )
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, dto, { returnDocument: 'after' })
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async toggleSavedPoint(userId: string, pointId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const alreadySaved = user.savedPointIds.includes(pointId);

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        alreadySaved
          ? { $pull: { savedPointIds: pointId } }
          : { $addToSet: { savedPointIds: pointId } },
        { returnDocument: 'after' },
      )
      .select('-password');

    return {
      user: updatedUser,
      saved: !alreadySaved,
    };
  }

  async getSavedPointIds(userId: string) {
    const user = await this.userModel.findById(userId).select('savedPointIds');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.savedPointIds;
  }

  async toggleSavedUser(userId: string, targetUserId: string) {
    if (userId === targetUserId) {
      return {
        saved: false,
        message: 'You cannot save your own profile',
      };
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const alreadySaved = user.friendUserIds.includes(targetUserId);

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        alreadySaved
          ? { $pull: { friendUserIds: targetUserId } }
          : { $addToSet: { friendUserIds: targetUserId } },
        { returnDocument: 'after' },
      )
      .select('-password');

    return {
      user: updatedUser,
      saved: !alreadySaved,
    };
  }

  async getSavedUsers(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel
      .find({ _id: { $in: user.friendUserIds } })
      .select('-password');
  }

  async updateVerificationToken(
    userId: string,
    token: string,
  ) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        emailVerificationToken: token,
        emailVerificationExpires: new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ),
      },
      {
        returnDocument: 'after',
      },
    );
  }

  async updatePasswordResetToken(userId: string, token: string) {
   return this.userModel.findByIdAndUpdate(
      userId,
      {
        passwordResetToken: token,
        passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000),
      },
      { returnDocument: 'after' },
    );
  }

  async findByPasswordResetToken(token: string) {
    return this.userModel.findOne({
      passwordResetToken: token,
    });
  }

  async resetPassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return this.userModel.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        $unset: {
          passwordResetToken: '',
          passwordResetExpires: '',
        },
      },
      { returnDocument: 'after' },
    );
  }
}
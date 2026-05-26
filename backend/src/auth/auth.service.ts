import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../users/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const verificationToken = randomBytes(32).toString('hex');

    const user = await this.usersService.create({
      ...createUserDto,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    } as any);

    await this.mailService.sendEmailVerification(
      user.email,
      verificationToken,
    );

    return {
      message:
        'Акаунт створено. Перевірте пошту та підтвердіть email перед входом.',
    };
  }

  async verifyEmail(token: string) {
    if (!token) {
      throw new BadRequestException('Verification token is required');
    }

    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    if (
      user.emailVerificationExpires &&
      user.emailVerificationExpires < new Date()
    ) {
      throw new BadRequestException('Verification token expired');
    }

    await this.usersService.verifyEmail(user._id.toString());

    return this.getVerificationSuccessPage();
  }

  async resendVerification(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Користувача з таким email не знайдено');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email вже підтверджено');
    }

    const verificationToken = randomBytes(32).toString('hex');

    await this.usersService.updateVerificationToken(
      user._id.toString(),
      verificationToken,
    );

    await this.mailService.sendEmailVerification(
      user.email,
      verificationToken,
    );

    return {
      message: 'Лист підтвердження надіслано повторно',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return {
        message:
          'Якщо акаунт з таким email існує, ми надіслали інструкцію для відновлення пароля.',
      };
    }

    const resetToken = randomBytes(32).toString('hex');

    await this.usersService.updatePasswordResetToken(
      user._id.toString(),
      resetToken,
    );

    await this.mailService.sendPasswordReset(user.email, resetToken);

    return {
      message:
        'Якщо акаунт з таким email існує, ми надіслали інструкцію для відновлення пароля.',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    if (!token) {
      throw new BadRequestException('Токен відновлення пароля відсутній');
    }

    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('Пароль має містити мінімум 6 символів');
    }

    const user = await this.usersService.findByPasswordResetToken(token);

    if (!user) {
      throw new BadRequestException('Недійсний токен відновлення пароля');
    }

    if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Термін дії посилання минув');
    }

    await this.usersService.resetPassword(user._id.toString(), newPassword);

    return {
      message: 'Пароль успішно змінено',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        savedPointIds: user.savedPointIds,
        friendUserIds: user.friendUserIds,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  private getVerificationSuccessPage() {
    return `
      <html>
        <head>
          <title>Email підтверджено</title>
          <style>
            body {
              margin: 0;
              font-family: Arial, sans-serif;
              background: #E8E5DA;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }

            .card {
              max-width: 460px;
              background: #F5F0E6;
              border: 1px solid #CDBFAF;
              border-radius: 28px;
              padding: 40px 32px;
              text-align: center;
              box-shadow: 0 12px 32px rgba(35, 52, 73, 0.14);
            }

            .brand {
              color: #233449;
              font-size: 40px;
              font-weight: 900;
              letter-spacing: 4px;
              margin-bottom: 8px;
            }

            .tag {
              color: #855B52;
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 28px;
            }

            h1 {
              color: #233449;
              font-size: 26px;
              margin-bottom: 14px;
            }

            p {
              color: #636563;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 26px;
            }

            a {
              display: inline-block;
              background: #233449;
              color: #E8E5DA;
              padding: 14px 22px;
              border-radius: 16px;
              text-decoration: none;
              font-weight: 800;
            }
          </style>
        </head>

        <body>
          <div class="card">
            <div class="brand">LOCUS</div>
            <div class="tag">міська інфраструктура поруч</div>

            <h1>Пошту підтверджено</h1>

            <p>
              Супер! Ваш акаунт LOCUS активовано.
              Тепер ви можете увійти в застосунок і користуватися всіма можливостями.
            </p>

            <a href="http://localhost:8090/profile">
              Перейти до авторизації
            </a>
          </div>
        </body>
      </html>
    `;
  }
}
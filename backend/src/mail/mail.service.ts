import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  private getEmailTemplate({
    title,
    text,
    buttonText,
    buttonUrl,
    footer,
  }: {
    title: string;
    text: string;
    buttonText: string;
    buttonUrl: string;
    footer: string;
  }) {
    return `
      <div style="margin:0;padding:0;background:#E8E5DA;font-family:Arial,sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:32px 18px;">
          <div style="background:#F5F0E6;border:1px solid #CDBFAF;border-radius:28px;padding:34px;text-align:center;">
            <div style="font-size:38px;font-weight:900;letter-spacing:4px;color:#233449;margin-bottom:8px;">
              LOCUS
            </div>

            <div style="font-size:14px;font-weight:700;color:#855B52;margin-bottom:28px;">
              міська інфраструктура поруч
            </div>

            <h1 style="color:#233449;font-size:26px;margin:0 0 16px;">
              ${title}
            </h1>

            <p style="color:#636563;font-size:16px;line-height:1.6;margin:0 0 26px;">
              ${text}
            </p>

            <a href="${buttonUrl}"
              style="display:inline-block;background:#233449;color:#E8E5DA;text-decoration:none;
              padding:14px 22px;border-radius:16px;font-weight:800;font-size:15px;">
              ${buttonText}
            </a>

            <p style="color:#855B52;font-size:13px;line-height:1.5;margin:28px 0 0;">
              ${footer}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  async sendEmailVerification(email: string, token: string) {
    const verificationUrl = `http://192.168.0.102:3000/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"LOCUS" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Підтвердження email для LOCUS',
      html: this.getEmailTemplate({
        title: 'Підтвердіть email',
        text: 'Дякуємо за реєстрацію в LOCUS. Щоб активувати акаунт і почати додавати міські точки, підтвердіть вашу пошту.',
        buttonText: 'Підтвердити email',
        buttonUrl: verificationUrl,
        footer:
          'Якщо ви не створювали акаунт у LOCUS, просто проігноруйте цей лист.',
      }),
    });
  }

  async sendPasswordReset(email: string, token: string) {
    const resetUrl = `http://192.168.0.102:8090/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"LOCUS" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Відновлення пароля LOCUS',
      html: this.getEmailTemplate({
        title: 'Відновлення пароля',
        text: 'Ми отримали запит на зміну пароля для вашого акаунта LOCUS. Натисніть кнопку нижче, щоб створити новий пароль.',
        buttonText: 'Змінити пароль',
        buttonUrl: resetUrl,
        footer:
          'Якщо ви не запитували відновлення пароля, просто проігноруйте цей лист.',
      }),
    });
  }
}
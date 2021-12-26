import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, app_name: string, url: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
        app_name,
      },
    });
  }

  async sendResetPasswordLink(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password',
      template: './reset_password',
      context: {
        name: email,
        url,
        app_name: 'wegweg',
      },
    });
  }
}

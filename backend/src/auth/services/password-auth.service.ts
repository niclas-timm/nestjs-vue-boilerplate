import { MailService } from './../../mail/mail.service';
import { ForgotPasswordToken } from './../entities/forgot-password-token.entity';
import { User } from 'src/user/user.entity';
import { UserService } from './../../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    @InjectRepository(ForgotPasswordToken)
    private forgotPasswordRepository: Repository<ForgotPasswordToken>,
  ) {}

  /**
   * Update the password of a user.
   *
   * @param {User} user
   *   The user object.
   * @param oldPassword
   *   The old password of the user in plain text.
   * @param newPassword
   *   The new password in plain text.
   *
   * @returns
   */
  async changePassword(
    user: User,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    // Probably the password is not included in the user object. Thus, we need to reload the user and include the password.
    if (!user.password) {
      user = await this.userService.find({ id: user.id }, true);
    }
    // Check if the old password is correct.
    const isOldPasswordCorrect: boolean = await bcrypt.compare(
      oldPassword,
      user.password,
    );
    if (!isOldPasswordCorrect) {
      throw new UnauthorizedException('Old password not correct');
    }

    // Hash new password & update entity.
    const password = await bcrypt.hash(newPassword, 8);
    return await this.userService.updateUser(user.id, {
      password,
    });
  }

  /**
   * Send a reset password link to a given email that the user can then use to reset her password.
   *
   * @param {string} email
   *   The email of the user.
   *
   * @returns
   */
  async sendForgotPasswordLink(email: string) {
    const user = await this.userService.find({ email });

    // For security issues we won't throw an error if there is no user with the
    // provided email address.
    if (!user) {
      return;
    }

    // Sign a token that will expire in 5 minutes.
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 5,
    });

    // Create an entry in the Forgot Password table.
    const forgotPasswordEntry = await this.forgotPasswordRepository.create({
      email,
      token,
    });
    await this.forgotPasswordRepository.save(forgotPasswordEntry);

    // Send email with the reset password link.
    const url = `${process.env.FRONTEND_URL}/auth/password/reset/${token}`;
    await this.mailService.sendResetPasswordLink(email, url);
  }

  /**
   * Let the user set a new password after declaring that she forgot it.
   *
   * @param {string} token
   *   The token that she got per mail. Necessary for security reasons.
   *
   * @param newPassword
   *   The new password the user wants to set.
   *
   * @returns
   */
  async resetPassword(token: string, newPassword: string) {
    // Load the entry from DB with the given token.
    const forgotToken = await this.forgotPasswordRepository.findOne({ token });
    if (!forgotToken) {
      throw new BadRequestException('Invalid token');
    }

    // Decode token. Throws an error if invalid, return object with user email if valid.
    let emailFromToken: any;
    try {
      emailFromToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
    if (emailFromToken.email !== forgotToken.email) {
      throw new BadRequestException('Invalid token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    const user = await this.userService.find({ email: forgotToken.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userService.updateUser(user.id, {
      password: hashedPassword,
    });

    return updatedUser;
  }
}

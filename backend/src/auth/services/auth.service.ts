import { RegisterUserDto } from './../dtos/register-user.dto';
import { MailService } from '../../mail/mail.service';
import { UserService } from '../../user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}

  /**
   * Check user by credentials.
   *
   * @param {string} email
   *   The email of the user.
   * @param {string} password
   *   The plain password of the user
   *
   * @returns Promise<User> | null
   *   The user object.
   */
  async validateUser(email: string, password: string): Promise<User> | null {
    // Find the user by email from database and also load the password.
    const user = await this.userService.find({ email }, true);

    if (!user) {
      return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Remove the password again and send it to client.
    if (isPasswordCorrect) {
      delete user.password;
      return user;
    }

    return null;
  }

  /**
   * Register a new user.
   *
   * @param {object} user
   *   The data (name, email, password) of the new user.
   *
   * @returns {object}
   *   The nw user.
   */
  async registerUser(user: RegisterUserDto) {
    const existingUser = await this.userService.find({ email: user.email });
    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const hashedPassword = await bcrypt.hash(user.password, 8);
    const res = await this.userService.createUser({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    // Send email.
    this.sendEmailVerificationMail(res);

    return {
      user: res,
    };
  }

  /**
   * Send email verification email to user.
   *
   * @param {User} user
   *   The user we want to send the email to
   */
  private sendEmailVerificationMail(user: User): void {
    // Create JWT that holds the users email as payload and expires in 14 days.
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 14,
    });

    // The url the user can click in the mail in order to verify the email address.
    const url = `${process.env.FRONTEND_URL}/auth/email/verify/${token}`;

    // Use the mailService to send the mail.
    this.mailService.sendUserConfirmation(user, 'BlaBla', url);
  }

  /**
   * Verify the email address of a user.
   *
   * @param {string} token
   *   The token that holds the validation information.
   *
   * @returns
   */
  async verifyEmail(token: string): Promise<any> {
    // Validate token. Will throw error if it's not valid.
    let userFromTokenPayload: any;
    try {
      userFromTokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }

    // Update email verification status.
    const updatedUser = await this.userService.updateUser(
      userFromTokenPayload.id,
      {
        email_verified: true,
      },
    );

    return updatedUser;
  }
}

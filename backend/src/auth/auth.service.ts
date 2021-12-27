import { Repository } from 'typeorm';
import { MailService } from './../mail/mail.service';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { ForgotPasswordToken } from './forgot-password-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UserAndAccessTokenInterface from './interfaces/UserAndAccessTokenInterface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(ForgotPasswordToken)
    private forgotPasswordRepository: Repository<ForgotPasswordToken>,
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
   * Sign new Jwt token.
   *
   * @param user
   *   The user object.
   *
   * @returns {user, access_token}
   */
  login(user: User): UserAndAccessTokenInterface {
    return {
      user,
      access_token: this.createAccessToken(user),
    };
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
  async registerUser(user: any): Promise<UserAndAccessTokenInterface> {
    const existingUser = await this.userService.find({ email: user.email });
    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const hashedPassword = await bcrypt.hash(user.password, 8);
    const res = await this.userService.createUser(
      user.name,
      user.email,
      hashedPassword,
    );
    const access_token = this.createAccessToken(res);

    // Send email.
    this.sendEmailVerificationMail(res);

    return {
      user: res,
      access_token,
    };
  }

  /**
   * Generate new access token.
   *
   * @param {User} user
   *   The user object.
   *
   * @returns {string}
   *   The newly created token.
   */
  private createAccessToken(user: User): string {
    const payload = { ...user };
    return this.jwtService.sign(payload);
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
    const url = `${process.env.FRONTEND_URL}auth/email/verify/${token}`;

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

  /**
   * Change the password of a user.
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
    const url = `${process.env.FRONTEND_URL}auth/password/reset/${token}`;
    await this.mailService.sendResetPasswordLink(email, url);
  }

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

  /**
   * Log in or register with Google.
   *
   * @param {Request} req
   *   The request object.
   *
   * @returns
   */
  async googleLogin(req): Promise<UserAndAccessTokenInterface> | null {
    // By the google strategy / google guard, the user is appended to the request object.
    if (!req.user) {
      return;
    }

    // Check if there is a user with this email already:
    const existingUser: User = await this.userService.find({
      email: req.user.email,
    });
    if (existingUser) {
      return {
        user: existingUser,
        access_token: this.createAccessToken(existingUser),
      };
    }

    const newUser = await this.userService.createUser(
      req.user.name,
      req.user.email,
      '123456',
    );
    return {
      user: newUser,
      access_token: this.createAccessToken(newUser),
    };
  }
}

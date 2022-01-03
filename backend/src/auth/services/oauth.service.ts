import { UserService } from './../../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class OAuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Log in or register via oAuth.
   *
   * @param {Request} req
   *   The request object.
   *
   * @returns
   */
  async socialLogin(req: { user: any; socialChannel: string }) {
    // Passports middleware adds the user to the request object.
    if (!req.user) {
      throw new BadRequestException('No account presented.');
    }

    // Check if there is a user with this email already:
    const existingUser: User = await this.userService.find({
      email: req.user.email,
    });
    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.userService.createUser({
      ...req.user,
      social_channel: req.socialChannel,
      email_verified: true,
    });
    return {
      user: newUser,
    };
  }
}

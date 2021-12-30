import { Controller, Get, Req, UseGuards, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { TwitterOAuthGuard } from '../guards/twitter-auth.guard';
import UserAndAccessTokenInterface from '../interfaces/UserAndAccessTokenInterface';

@Controller('auth/twitter')
export class TwitterOAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(TwitterOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('callback')
  @Redirect(`${process.env.FRONTEND_URL}/auth/twitter/callback`, 302)
  @UseGuards(AuthGuard('twitter'))
  async googleAuthRedirect(@Req() req) {
    const userAndAccessToken: UserAndAccessTokenInterface =
      await this.authService.twitterLogin(req);

    return {
      url: `${process.env.FRONTEND_URL}/auth/twitter/callback?token=${userAndAccessToken.access_token}`,
    };
  }
}

import { Controller, Get, Req, UseGuards, Redirect, Res } from '@nestjs/common';
import { TwitterOAuthGuard } from '../guards/twitter-auth.guard';

@Controller('auth/twitter')
export class TwitterOAuthController {
  @Get()
  @UseGuards(TwitterOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('callback')
  @UseGuards(TwitterOAuthGuard)
  async twitterAuthRedirect(@Req() req, @Res() res) {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
}

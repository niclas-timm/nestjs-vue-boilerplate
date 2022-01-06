import { OAuthService } from './../services/oauth.service';
import { Controller, Get, Req, Request, UseGuards, Res } from '@nestjs/common';
import { GoogleOAuthGuard } from '../guards/google-auth.guard';

@Controller('auth/google')
export class GoogleOAuthController {
  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
}

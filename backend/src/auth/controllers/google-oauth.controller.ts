import {
  Controller,
  Get,
  Req,
  Request,
  UseGuards,
  Redirect,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { GoogleOAuthGuard } from '../guards/google-auth.guard';
import UserAndAccessTokenInterface from '../interfaces/UserAndAccessTokenInterface';

@Controller('auth/google')
export class GoogleOAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback`);
  }
}

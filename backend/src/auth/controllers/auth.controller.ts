import { PasswordService } from './../services/password-auth.service';
import { LoggedInGuard } from './../guards/logged-in.guard';
import { VerifyEmailTokenDto } from '../dtos/verify-email-token.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../guards/local.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * Log user in.
   *
   * @param {Request} req
   *   The request object.
   *
   * @returns User
   */
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return req.session;
  }

  /**
   * Register new user.
   *
   * @param {RegisterUserDto} registerUserDto
   *   The data (name, email, password) of the new user.
   *
   * @returns
   */
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  /**
   * Get data of the current user.
   *
   * @param {Request} req
   *   The request object.
   *
   * @returns
   */
  @UseGuards(LoggedInGuard)
  @Get('user')
  async getUser(@Request() req): Promise<any> {
    return req.user;
  }

  @UseGuards(LoggedInGuard)
  @Get('logout')
  logout(@Request() req) {
    req.session.destroy();
    return req.logOut();
  }

  /**
   * Verify email address of user.
   *
   * @param {Param} params
   *   A token holding data about the validation process.
   *
   * @returns
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('email/verify/:token')
  async verifyEmail(@Param() params: VerifyEmailTokenDto) {
    return this.authService.verifyEmail(params.token);
  }

  /**
   * Update password of a user.
   *
   * @param {Request} req
   *   The request object.
   *
   * @param {UpdatePasswordDto} body
   *   Information about the new password.
   *
   * @returns
   */
  @UseGuards(LoggedInGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch('password/update')
  async updatePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    return await this.passwordService.changePassword(
      req.user,
      body.oldPassword,
      body.newPassword,
    );
  }

  /**
   * Send email to user with a reset password link.
   *
   * @param {ForgotPasswordDto} body
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('password/forgotlink')
  async sendForgotPasswordLink(@Body() body: ForgotPasswordDto) {
    this.passwordService.sendForgotPasswordLink(body.email);
  }

  /**
   * Reset password of a user.
   *
   * @param {ResetPasswordDto} body
   *   Data about the new password.
   */
  @Post('password/reset')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() body: ResetPasswordDto) {
    this.passwordService.resetPassword(body.token, body.newPassword);
  }
}

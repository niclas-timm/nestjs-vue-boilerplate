import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

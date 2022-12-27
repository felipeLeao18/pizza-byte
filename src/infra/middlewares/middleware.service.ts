import { GetUserByToken } from '@app/use-cases/user/get-user-by-token';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MyMiddlewareProvider implements NestMiddleware {
  constructor(private readonly myMiddleware: GetUserByToken) {}
  use(req: any, res: any, next: (error?: any) => void) {
    this.myMiddleware.use(req, res, next);
  }
}

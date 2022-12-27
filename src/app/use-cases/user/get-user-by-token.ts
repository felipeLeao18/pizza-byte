import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { Middleware } from '@app/repositories/middleware-repository';

@Injectable()
export class GetUserByToken implements Middleware {
  constructor(
    private userRepository: UserRepository,
    private authenticatorRepository: AuthenticatorRepository,
  ) {}

  async use(request: any, res: any, next: () => void) {
    const token = request.headers['x-api-key'];

    if (token) {
      const id = await this.authenticatorRepository.decrypt(token);

      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new ForbiddenException();
      }
      request.user = user.id;
      return next();
    }

    throw new ForbiddenException();
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';

interface IGetUserByTokenRequest {
  token: string;
}

interface IGetUserByTokenResponse {
  userId: string;
}

@Injectable()
export class GetUserByToken {
  constructor(
    private userRepository: UserRepository,
    private authenticatorRepository: AuthenticatorRepository,
  ) {}
  async execute(
    request: IGetUserByTokenRequest,
  ): Promise<IGetUserByTokenResponse> {
    const { token } = request;

    if (token) {
      const userId = await this.authenticatorRepository.decrypt(token);

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new ForbiddenException();
      }
      return {
        userId: user.id,
      };
    }

    throw new ForbiddenException();
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { Email } from '@app/entities/email';

interface IGetUserLoggedInfoRequest {
  userId: string;
}

interface IGetUserLoggedInfoResponse {
  user: {
    email: Email;
    name: string;
    id: string;
  };
}

@Injectable()
export class GetUserLoggedInfo {
  constructor(private userRepository: UserRepository) {}
  async execute(
    request: IGetUserLoggedInfoRequest,
  ): Promise<IGetUserLoggedInfoResponse> {
    const { userId } = request;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpException('Session expired', HttpStatus.FORBIDDEN);
    }

    return {
      user: { name: user.name, email: user.email, id: user.id },
    };
  }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { Email } from '@app/entities/email';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  user: {
    email: Email;
    name: string;
    id: string;
  };
  token: string;
}

@Injectable()
export class Login {
  constructor(
    private userRepository: UserRepository,
    private cryptRepository: CrypterRepository,
    private authRepository: AuthenticatorRepository,
  ) {}
  async execute(request: ILoginRequest): Promise<ILoginResponse> {
    const { email, password } = request;

    const user = await this.userRepository.findOneByEmail(email);
    const invalidUser =
      !user ||
      !(await this.cryptRepository.compare(password, user.password.value));

    if (invalidUser) {
      throw new Error('Invalid email or password');
    }

    const token = await this.authRepository.encrypt(user.id);
    console.log({ token });

    return {
      user: { name: user.name, email: user.email, id: user.id },
      token,
    };
  }
}

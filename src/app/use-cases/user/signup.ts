import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user';
import { Email } from '@app/entities/email';
import { Password } from '@app/entities/password';
import { UserRepository } from '@app/repositories/user-repository';
import { CrypterRepository } from '@app/repositories/crypter-repository';

interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface ISignUpResponse {
  user: User;
}

@Injectable()
export class SignUp {
  constructor(
    private userRepository: UserRepository,
    private cryptRepository: CrypterRepository,
  ) {}

  async execute(request: ISignUpRequest): Promise<ISignUpResponse> {
    const { name, email, password } = request;
    const user = new User({
      name,
      email: new Email(email),
      password: new Password(password),
    });

    user.password = new Password(
      await this.cryptRepository.createHash(user.password.value),
    );

    await this.userRepository.signup(user);

    return { user };
  }
}

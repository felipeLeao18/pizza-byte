/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@app/entities/user';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { InMemoryUserRepository } from '@test-repositories/in-memory-user-repository';
import { makeUser } from '@test-factories/user-factory';
import { SignUp } from './signup';
import { Login } from './login';
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';

class CryptSut implements Partial<CrypterRepository> {
  async createHash(data: string): Promise<string> {
    return data.concat('hash');
  }
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return true;
  }
}

class AuthSut implements Partial<AuthenticatorRepository> {
  async encrypt(plaintext: string): Promise<string> {
    return plaintext.concat('token');
  }
}

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should throw when user does not exists', async () => {
    const usersRepository = new InMemoryUserRepository();
    const cryptRepository = new CryptSut();
    const authRepository = new AuthSut();

    const login = new Login(
      usersRepository,
      cryptRepository as CrypterRepository,
      authRepository as AuthenticatorRepository,
    );

    const data = { email: 'any@mail.com', password: '123456' };
    expect(async () => await login.execute(data)).rejects.toThrow(
      'Invalid email or password',
    );
  });

  it('should throw when passwords dont match', async () => {
    const usersRepository = new InMemoryUserRepository();
    const cryptRepository = new CryptSut();
    const authRepository = new AuthSut();

    jest
      .spyOn(cryptRepository, 'compare')
      .mockImplementationOnce(
        async (plaintext: string, digest: string) => false,
      );

    const userSut = new User(makeUser());

    const userData = await usersRepository.create(userSut);

    const login = new Login(
      usersRepository,
      cryptRepository as CrypterRepository,
      authRepository as AuthenticatorRepository,
    );

    const data = {
      email: userData.email.value,
      password: userData.password.value,
    };

    expect(async () => await login.execute(data)).rejects.toThrow(
      'Invalid email or password',
    );
  });

  it('should login ', async () => {
    const usersRepository = new InMemoryUserRepository();
    const cryptRepository = new CryptSut();
    const authRepository = new AuthSut();

    const userSut = new User(makeUser());

    const userData = await usersRepository.create(userSut);

    const login = new Login(
      usersRepository,
      cryptRepository as CrypterRepository,
      authRepository as AuthenticatorRepository,
    );

    const data = {
      email: userData.email.value,
      password: userData.password.value,
    };

    const loginResponse = await login.execute(data);
    const { user, token } = loginResponse;
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.name).toBeDefined();

    expect(token).toBeDefined();
    expect(token).toBe(user.id.concat('token'));
  });
});

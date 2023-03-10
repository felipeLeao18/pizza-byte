import { User } from '@app/entities/user';
import { InMemoryUserRepository } from '@test-repositories/in-memory-user-repository';
import { makeUser } from '@test-factories/user-factory';
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { GetUserByToken } from './get-user-by-token';

class AuthSut implements Partial<AuthenticatorRepository> {
  async decrypt(ciphertext: string): Promise<string> {
    return ciphertext;
  }
}

describe('Get user by token', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should throw when token is not provided', async () => {
    const usersRepository = new InMemoryUserRepository();
    const authRepository = new AuthSut();

    const getUserByToken = new GetUserByToken(
      usersRepository,
      authRepository as AuthenticatorRepository,
    );

    const userSut = makeUser();
    await usersRepository.create(userSut);

    expect(() =>
      getUserByToken.use({ headers: '' }, {}, () => null),
    ).rejects.toThrow('Forbidden');
  });

  it('should throw when token provided does not match with any user id', async () => {
    const usersRepository = new InMemoryUserRepository();
    const authRepository = new AuthSut();

    const getUserByToken = new GetUserByToken(
      usersRepository,
      authRepository as AuthenticatorRepository,
    );

    jest
      .spyOn(usersRepository, 'findById')
      .mockImplementationOnce(async () => null);

    const userSut = new User(makeUser());
    await usersRepository.create(userSut);

    expect(() =>
      getUserByToken.use({ headers: 'any' }, {}, () => null),
    ).rejects.toThrow('Forbidden');
  });

  it('should return ok when token provided decrypted matches user id', async () => {
    const usersRepository = new InMemoryUserRepository();
    const authRepository = new AuthSut();

    const getUserByToken = new GetUserByToken(
      usersRepository,
      authRepository as AuthenticatorRepository,
    );

    const userSut = makeUser();
    await usersRepository.create(userSut);

    expect(() =>
      getUserByToken.use(
        { headers: { 'x-api-key': userSut.id } },
        {},
        () => null,
      ),
    ).not.toThrow();
  });
});

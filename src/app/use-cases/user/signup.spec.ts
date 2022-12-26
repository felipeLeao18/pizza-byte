import { User } from '@app/entities/user';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { InMemoryUserRepository } from '@test-repositories/in-memory-user-repository';
import { makeUser } from '@test-factories/user-factory';
import { SignUp } from './signup';

class CryptSut implements Partial<CrypterRepository> {
  async createHash(data: string): Promise<string> {
    return data.concat('hash');
  }
}

describe('Sign up', () => {
  it('should throw when email is already taken', async () => {
    const usersRepository = new InMemoryUserRepository();
    const cryptRepository = new CryptSut();
    const signUp = new SignUp(
      usersRepository,
      cryptRepository as CrypterRepository,
    );

    const userSut = new User(makeUser());
    await usersRepository.create(userSut);

    expect(() =>
      signUp.execute({
        name: 'mock_user',
        email: usersRepository.users[0].email.value,
        password: 'mock_password',
      }),
    ).rejects;
  });

  it('should be able to sign up', async () => {
    const usersRepository = new InMemoryUserRepository();
    const cryptRepository = new CryptSut();
    const signUp = new SignUp(
      usersRepository,
      cryptRepository as CrypterRepository,
    );

    const password = 'password_mock';
    const { user } = await signUp.execute({
      name: 'mock_user',
      email: 'mock_mail@mail.com',
      password,
    });

    expect(user).toBeTruthy();

    expect(usersRepository.users.length).toBe(1);
    expect(user).toEqual(usersRepository.users[0]);
    expect(user.password.value).toBe(password.concat('hash'));
  });
});

import { CrypterRepository } from '@app/repositories/crypter-repository';
import { InMemoryUserRepository } from '@app/repositories/in-memory-user-repository';
import { SignUp } from './signup';

class CryptSut implements Partial<CrypterRepository> {
  async createHash(data: string): Promise<string> {
    return data.concat('hash');
  }
}

describe('Sign up', () => {
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

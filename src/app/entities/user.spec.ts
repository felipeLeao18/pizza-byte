import { Email } from './email';
import { Password } from './password';
import { User } from './user';

describe('User', () => {
  it('should create User', async () => {
    const user = new User({
      name: 'user_mock',
      email: new Email('user_mock@mail.com'),
      password: new Password('123456'),
    });

    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.createdAt).toEqual(expect.any(Date));
    expect(user.updatedAt).toEqual(expect.any(Date));
  });
});

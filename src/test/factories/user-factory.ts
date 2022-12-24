import { Email } from '@app/entities/email';
import { Password } from '@app/entities/password';
import { IUserProps, User } from '@app/entities/user';

type Override = Partial<IUserProps>;
export function makeUser(override?: Override) {
  return new User({
    email: new Email('factory_user@mail.com'),
    name: 'factory_name',
    password: new Password('factory_password'),
    ...override,
  });
}

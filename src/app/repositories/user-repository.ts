import { User } from '@app/entities/user';

export abstract class UserRepository {
  abstract signup(user: User): Promise<User>;
  abstract findOneByEmail(email: string): Promise<Partial<User> | null>;
}

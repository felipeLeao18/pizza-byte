import { User } from '@app/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findOneByEmail(email: string): Promise<User | null>;
}

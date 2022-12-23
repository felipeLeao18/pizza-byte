import { User } from '@app/entities/user';
import { UserRepository } from './user-repository';

export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];
  async signup(user: User): Promise<User> {
    const usersCount = this.users.push(user);
    return this.users[usersCount - 1];
  }
}

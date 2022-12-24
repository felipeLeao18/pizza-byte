import { User } from '@app/entities/user';
import { UserRepository } from './user-repository';

export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];
  async findOneByEmail(email: string): Promise<Partial<User> | null> {
    const user = await this.users.find((user) => user.email.value === email);
    if (!user) {
      return null;
    }
    return user;
  }
  async signup(user: User): Promise<User> {
    const usersCount = this.users.push(user);
    return this.users[usersCount - 1];
  }
}

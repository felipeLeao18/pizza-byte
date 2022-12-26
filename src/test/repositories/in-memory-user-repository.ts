import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';

export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];
  async findById(id: string): Promise<User | null> {
    const user = await this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.users.find((user) => user.email.value === email);
    if (!user) {
      return null;
    }
    return user;
  }
  async create(user: User): Promise<User> {
    const usersCount = this.users.push(user);
    return this.users[usersCount - 1];
  }
}

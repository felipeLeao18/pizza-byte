import { Email } from '@app/entities/email';
import { Password } from '@app/entities/password';
import { User } from '@app/entities/user';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(userRaw: UserRaw): User {
    return new User(
      {
        name: userRaw.name,
        email: new Email(userRaw.email),
        password: new Password(userRaw.password),
        createdAt: userRaw.createdAt,
        updatedAt: userRaw.updatedAt,
      },
      userRaw.id,
    );
  }
}

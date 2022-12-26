import { User } from '@app/entities/user';

export class UserViewModel {
  static toHTTP(user: Partial<User>) {
    const userMade = {
      id: user.id,
      email: user.email?.value,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    Object.keys(userMade).filter((key) => {
      if (userMade[key] === null) {
        delete userMade[key];
      }
    });

    return userMade;
  }
}

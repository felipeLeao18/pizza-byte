import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { User } from '@app/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findOneByEmail(email: string): Promise<Partial<User> | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async signup(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);

    const userDb = await this.prisma.user.create({
      data: raw,
    });

    return PrismaUserMapper.toDomain(userDb);
  }
}

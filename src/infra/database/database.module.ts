import { CategoryRepository } from '@app/repositories/category-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [UserRepository, CategoryRepository],
})
export class DatabaseModule {}

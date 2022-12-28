import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { CreateCategory } from '@app/use-cases/category/create-category';
import { GetCategoryById } from '@app/use-cases/category/get-category';
import { Login } from '@app/use-cases/user/login';
import { SignUp } from '@app/use-cases/user/signup';
import { JwtRepository } from '@infra/authentication/jwt/jwt.repository';
import { BcryptRepository } from '@infra/cryptography/bcrypt/bcrypt-repository';
import { MiddlewareModule } from '@infra/middlewares/middleware.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CategoryController } from './controllers/category-controller';
import { UserController } from './controllers/user-controller';

@Module({
  imports: [DatabaseModule, MiddlewareModule],
  controllers: [UserController, CategoryController],
  providers: [
    SignUp,
    {
      provide: CrypterRepository,
      useClass: BcryptRepository,
    },
    Login,
    {
      provide: CrypterRepository,
      useClass: BcryptRepository,
    },
    {
      provide: AuthenticatorRepository,
      useClass: JwtRepository,
    },
    CreateCategory,
    CategoryController,
    GetCategoryById,
  ],
  exports: [AuthenticatorRepository],
})
export class HttpModule {}

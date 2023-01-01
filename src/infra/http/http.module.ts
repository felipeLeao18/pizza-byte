import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { BucketRepository } from '@app/repositories/bucket-repository';
import { CategoryRepository } from '@app/repositories/category-repository';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { CreateCategory } from '@app/use-cases/category/create-category';
import { GetCategories } from '@app/use-cases/category/get-categories';
import { GetCategoryById } from '@app/use-cases/category/get-category';
import { CreateProduct } from '@app/use-cases/product/create-product';
import { GetManyProducts } from '@app/use-cases/product/get-many-products';
import { Login } from '@app/use-cases/user/login';
import { SignUp } from '@app/use-cases/user/signup';
import { JwtRepository } from '@infra/authentication/jwt/jwt.repository';
import { S3Repository } from '@infra/bucket/s3/s3.repository';
import { BcryptRepository } from '@infra/cryptography/bcrypt/bcrypt-repository';
import { PrismaCategoryRepository } from '@infra/database/prisma/repositories/prisma-category-repository';
import { MiddlewareModule } from '@infra/middlewares/middleware.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CategoryController } from './controllers/category-controller';
import { ProductController } from './controllers/product-controller';
import { UserController } from './controllers/user-controller';

@Module({
  imports: [DatabaseModule, MiddlewareModule],
  controllers: [UserController, CategoryController, ProductController],
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
    GetCategories,
    CreateProduct,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: BucketRepository,
      useClass: S3Repository,
    },
    GetManyProducts,
  ],
  exports: [AuthenticatorRepository],
})
export class HttpModule {}

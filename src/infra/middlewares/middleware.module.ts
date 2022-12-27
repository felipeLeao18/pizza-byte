import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { GetUserByToken } from '@app/use-cases/user/get-user-by-token';
import { JwtRepository } from '@infra/authentication/jwt/jwt.repository';

import { BcryptRepository } from '@infra/cryptography/bcrypt/bcrypt-repository';
import { DatabaseModule } from '@infra/database/database.module';
import { Get, Module } from '@nestjs/common';
import { MyMiddlewareProvider } from './middleware.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetUserByToken,
    {
      provide: CrypterRepository,
      useClass: BcryptRepository,
    },
    {
      provide: AuthenticatorRepository,
      useClass: JwtRepository,
    },

    MyMiddlewareProvider,
    {
      provide: GetUserByToken,
      useClass: GetUserByToken,
    },
  ],
  exports: [GetUserByToken],
})
export class MiddlewareModule {}

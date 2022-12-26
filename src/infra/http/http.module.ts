import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { CrypterRepository } from '@app/repositories/crypter-repository';
import { Login } from '@app/use-cases/user/login';
import { SignUp } from '@app/use-cases/user/signup';
import { JwtRepository } from '@infra/authentication/jwt/jwt.repository';
import { BcryptRepository } from '@infra/cryptography/bcrypt/bcrypt-repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user-controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
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
  ],
})
export class HttpModule {}

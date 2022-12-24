import { CrypterRepository } from '@app/repositories/crypter-repository';
import { SignUp } from '@app/use-cases/user/signup';
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
  ],
})
export class HttpModule {}

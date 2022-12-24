import { Module } from '@nestjs/common';
import { BcryptRepository } from './bcrypt/bcrypt-repository';

@Module({
  exports: [BcryptRepository],
})
export class CryptographyModule {}

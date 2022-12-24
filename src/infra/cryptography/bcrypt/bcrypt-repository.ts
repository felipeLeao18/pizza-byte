import { hash, compare as bcryptCompare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { CrypterRepository } from '@app/repositories/crypter-repository';

@Injectable()
export class BcryptRepository implements CrypterRepository {
  async createHash(plaintext: string): Promise<string> {
    return await hash(plaintext, 10);
  }
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcryptCompare(plaintext, digest);
  }
}

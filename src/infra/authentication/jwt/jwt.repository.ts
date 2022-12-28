/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { config } from 'src/env';

@Injectable()
export class JwtRepository implements AuthenticatorRepository {
  constructor() {}

  private readonly secret = config.JWT_SECRET;
  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    const decoded = jwt.verify(ciphertext, this.secret);
    if (typeof decoded === 'object' && decoded.id) {
      return decoded.id;
    }

    return decoded as string;
  }
}

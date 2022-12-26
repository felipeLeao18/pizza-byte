/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import jwt from 'jsonwebtoken';
import { config } from 'src/config';

export class JwtRepository implements AuthenticatorRepository {
  constructor() {}

  private readonly secret = config.JWT_SECRET;
  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret);
  }
}

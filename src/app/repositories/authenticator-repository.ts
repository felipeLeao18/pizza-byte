export abstract class AuthenticatorRepository {
  abstract encrypt(plaintext: string): Promise<string>;
  abstract decrypt(ciphertext: string): Promise<string>;
}

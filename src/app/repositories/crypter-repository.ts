export abstract class CrypterRepository {
  abstract createHash(data: string): Promise<string>;
  abstract compare(plaintext: string, digest: string): Promise<boolean>;
}

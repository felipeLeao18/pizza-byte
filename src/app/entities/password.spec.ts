import { Password } from './password';

describe('Email', () => {
  it('should throw when password provided length is less than 5 characters', async () => {
    const invalidPasswords: string[] = ['', '1', '12', '123', '1234'];

    invalidPasswords.forEach((invalidPassword) => {
      expect(() => new Password(invalidPassword)).toThrow();
    });
  });
  it('should create password when password provided is valid', async () => {
    const validPassword = '1'.repeat(5);
    const password = new Password(validPassword);
    expect(password).toBeTruthy();
  });
});

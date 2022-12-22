import { Email } from './email';

describe('Email', () => {
  it('should throw when email provided is invalid', async () => {
    const invalidEmails: string[] = [
      'mock',
      'mock@mail',
      '@',
      'mock@mock@mail',
      'mock_mail',
      'mock mail',
      '',
    ];

    invalidEmails.forEach((invalidEmail) => {
      expect(() => new Email(invalidEmail)).toThrow();
    });
  });
  it('should create email when email provided is valid', async () => {
    const validEmailAddres = 'valid_email@mail.com';
    const email = new Email(validEmailAddres);
    expect(email).toBeTruthy();
    expect(email.value).toBe(validEmailAddres);
  });
});

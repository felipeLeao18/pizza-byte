export class Password {
  private password: string;

  constructor(password: string) {
    const isValidPassword = this.validatePassword(password);

    if (!isValidPassword) {
      throw new Error('Password must be greather than 5 characters');
    }
    this.password = password;
  }

  private validatePassword(password: string): boolean {
    return password.length >= 5;
  }

  get value(): string {
    return this.password;
  }
}

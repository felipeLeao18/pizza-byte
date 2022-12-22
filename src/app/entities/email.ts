export class Email {
  private email: string;

  constructor(email: string) {
    const isValidEmail = this.validateEmail(email);

    if (!isValidEmail) {
      throw new Error('invalid email');
    }
    this.email = email;
  }

  private validateEmail(email: string): boolean {
    const validEmailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return validEmailRegex.test(email);
  }

  get value(): string {
    return this.email;
  }
}

import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Email } from './email';
import { Password } from './password';

export interface IUserProps {
  name: string;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: IUserProps;
  private _id: string;

  constructor(
    props: Replace<IUserProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set password(password: Password) {
    this.props.password = password;
  }

  public get password(): Password {
    return this.props.password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

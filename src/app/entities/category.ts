import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export interface ICategoryProps {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Category {
  private props: ICategoryProps;
  private _id: string;

  constructor(
    props: Replace<ICategoryProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

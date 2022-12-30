import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export interface IProductProps {
  name: string;
  price: string;
  description: string;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
  category_id: string;
}

export class Product {
  private props: IProductProps;
  private _id: string;

  constructor(
    props: Replace<IProductProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set banner(banner: string) {
    this.props.banner = banner;
  }

  public get banner(): string {
    return this.props.banner;
  }

  public set price(price: string) {
    this.props.price = price;
  }

  public get price(): string {
    return this.props.price;
  }

  public set category_id(category_id: string) {
    this.props.category_id = category_id;
  }

  public get category_id(): string {
    return this.props.category_id;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

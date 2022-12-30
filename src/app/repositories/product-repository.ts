import { Product } from '@app/entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
}

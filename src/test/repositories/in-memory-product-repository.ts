import { Product } from '@app/entities/product';
import { ProductRepository } from '@app/repositories/product-repository';

export class InMemoryProductRepository extends ProductRepository {
  public products: Product[] = [];
  async create(product: Product): Promise<Product> {
    const productsCount = this.products.push(product);
    return this.products[productsCount - 1];
  }
}

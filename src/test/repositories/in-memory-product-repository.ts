import { Product } from '@app/entities/product';
import { ProductRepository } from '@app/repositories/product-repository';

export class InMemoryProductRepository extends ProductRepository {
  public products: Product[] = [];
  async create(product: Product): Promise<Product> {
    const productsCount = this.products.push(product);
    return this.products[productsCount - 1];
  }

  async getMany(category_id?: string): Promise<Product[]> {
    if (!category_id) {
      return this.products;
    }

    return this.products.filter(
      (product: Product) => product.category_id === category_id,
    );
  }
}

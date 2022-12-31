import { Product } from '@app/entities/product';

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      banner: product.banner,
      category_id: product.category_id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}

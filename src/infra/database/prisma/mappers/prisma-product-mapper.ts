import { Product } from '@app/entities/product';
import { Product as ProductRaw } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      banner: product.banner,
      price: product.price,
      category_id: product.category_id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(productRaw: ProductRaw): Product {
    return new Product(
      {
        name: productRaw.name,
        description: productRaw.description,
        banner: productRaw.banner,
        price: productRaw.price,
        category_id: productRaw.category_id,
        createdAt: productRaw.createdAt,
        updatedAt: productRaw.updatedAt,
      },
      productRaw.id,
    );
  }
}

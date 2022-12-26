import { Category } from '@app/entities/category';
import { Category as CategoryRaw } from '@prisma/client';

export class PrismaCategoryMapper {
  static toPrisma(category: Category) {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static toDomain(categoryRaw: CategoryRaw): Category {
    return new Category(
      {
        name: categoryRaw.name,
        createdAt: categoryRaw.createdAt,
        updatedAt: categoryRaw.updatedAt,
      },
      categoryRaw.id,
    );
  }
}

import { Category } from '@app/entities/category';
import { CategoryRepository } from '@app/repositories/category-repository';

export class InMemoryCategoryRepository extends CategoryRepository {
  public categories: Category[] = [];
  async create(category: Category): Promise<Category> {
    const categoriesCount = this.categories.push(category);
    return this.categories[categoriesCount - 1];
  }
}

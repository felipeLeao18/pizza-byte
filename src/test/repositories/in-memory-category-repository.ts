import { Category } from '@app/entities/category';
import { CategoryRepository } from '@app/repositories/category-repository';

export class InMemoryCategoryRepository extends CategoryRepository {
  public categories: Category[] = [];
  async create(category: Category): Promise<Category> {
    const categoriesCount = this.categories.push(category);
    return this.categories[categoriesCount - 1];
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find(
      (category: Category) => category.id === id,
    );
    if (!category) {
      return null;
    }
    return category;
  }

  async findMany(): Promise<Category[]> {
    return this.categories;
  }
}

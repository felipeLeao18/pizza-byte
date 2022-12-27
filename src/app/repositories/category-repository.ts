import { Category } from '@app/entities/category';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
}

import { makeCategory } from '@test-factories/category-factory';
import { InMemoryCategoryRepository } from '@test-repositories/in-memory-category-repository';
import { GetCategories } from './get-categories';

describe('Get categories', () => {
  it('should get categories', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const getCategories = new GetCategories(categoryRepository);

    const TOTAL_CATEGORIES = 5;
    for (let i = 0; i < TOTAL_CATEGORIES; i++) {
      categoryRepository.create(makeCategory());
    }

    const { categories } = await getCategories.execute();
    expect(categories.length).toBe(TOTAL_CATEGORIES);

    categories.forEach((category) => {
      expect(category.id).toBeDefined();
      expect(category.name).toBeDefined();
      expect(category.createdAt).toBeDefined();
      expect(category.updatedAt).toBeDefined();
      expect(category.id).toBeDefined();
    });
  });
});

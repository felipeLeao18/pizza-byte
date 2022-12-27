import { InMemoryCategoryRepository } from '@test-repositories/in-memory-category-repository';
import { CreateCategory } from './create-category';

describe('Create category', () => {
  it('should create category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);

    const { category } = await createCategory.execute({
      name: 'category',
    });

    expect(category).toBeTruthy();

    expect(categoryRepository.categories.length).toBe(1);
    expect(category).toEqual(categoryRepository.categories[0]);
    expect(categoryRepository.categories[0].name).toBeDefined();
  });
});

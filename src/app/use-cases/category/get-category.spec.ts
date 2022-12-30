import { makeCategory } from '@test-factories/category-factory';
import { InMemoryCategoryRepository } from '@test-repositories/in-memory-category-repository';
import { randomUUID } from 'crypto';
import { CategoryNotFoundError } from '../errors/category-errors';
import { GetCategoryById } from './get-category';

describe('Get category by id', () => {
  it('should throw when id provided does not match any category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const getCategoryById = new GetCategoryById(categoryRepository);

    jest
      .spyOn(categoryRepository, 'findById')
      .mockImplementationOnce(async () => null);

    expect(
      async () =>
        await getCategoryById.execute({
          id: randomUUID(),
        }),
    ).rejects.toThrow(CategoryNotFoundError);
  });

  it('should get category when id provided matches category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const getCategoryById = new GetCategoryById(categoryRepository);

    const categorySut = makeCategory();
    await categoryRepository.create(categorySut);

    const { category } = await getCategoryById.execute({
      id: categorySut.id,
    });
    expect(category).toBeTruthy();
  });
});

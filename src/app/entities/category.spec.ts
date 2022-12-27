import { Category } from './category';

describe('Category', () => {
  it('should create category', async () => {
    const category = new Category({
      name: 'my category',
    });

    expect(category.id).toBeDefined();
    expect(category.name).toBeDefined();
    expect(category.createdAt).toEqual(expect.any(Date));
    expect(category.updatedAt).toEqual(expect.any(Date));
  });
});

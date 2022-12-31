import { BucketRepository } from '@app/repositories/bucket-repository';
import { InMemoryCategoryRepository } from '@test-repositories/in-memory-category-repository';
import { InMemoryProductRepository } from '@test-repositories/in-memory-product-repository';
import { CategoryNotFoundError } from '../errors/category-errors';
import { CreateProduct } from './create-product';

class BucketSut implements Partial<BucketRepository> {
  async upload(blob: any): Promise<{ link: string }> {
    return { link: 'http://'.concat(blob.filename) };
  }
}
describe('Create product', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw when category_id provided can not be found', async () => {
    //arrange
    const productRepository = new InMemoryProductRepository();
    const categoryRepository = new InMemoryCategoryRepository();
    const BucketRepository = new BucketSut() as BucketRepository;

    jest
      .spyOn(categoryRepository, 'findById')
      .mockImplementationOnce(async (): Promise<any> => {
        return null;
      });
    const createProduct = new CreateProduct(
      categoryRepository,
      productRepository,
      BucketRepository,
    );

    // act and assert
    expect(
      async () =>
        await createProduct.execute({
          name: 'product name',
          description: 'product description',
          banner: { image: 'product image', filename: 'image.jpg' },
          category_id: '1234',
          price: '1500',
        }),
    ).rejects.toThrowError(CategoryNotFoundError);
  });
  it('should create product', async () => {
    //arrange
    const productRepository = new InMemoryProductRepository();
    const categoryRepository = new InMemoryCategoryRepository();
    const BucketRepository = new BucketSut() as BucketRepository;

    jest
      .spyOn(categoryRepository, 'findById')
      .mockImplementationOnce(async (): Promise<any> => {
        return { id: 1234 };
      });
    const createProduct = new CreateProduct(
      categoryRepository,
      productRepository,
      BucketRepository,
    );

    // act
    const { product } = await createProduct.execute({
      name: 'product name',
      description: 'product description',
      banner: { image: 'product image', filename: 'image.jpg' },
      category_id: '1234',
      price: '1500',
    });

    // assert
    expect(product).toBeTruthy();

    expect(productRepository.products.length).toBe(1);

    const [productSaved] = productRepository.products;
    expect(product).toEqual(productSaved);

    expect(productSaved).toBeDefined();
    expect(productSaved.banner).toBe('http://image.jpg');
  });
});

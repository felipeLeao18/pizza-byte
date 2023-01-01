import { makeProduct } from '@test-factories/product-factory';
import { InMemoryProductRepository } from '@test-repositories/in-memory-product-repository';
import { GetManyProducts } from './get-many-products';

describe('Get many products', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should get all products when no filter is provided', async () => {
    //arrange
    const productRepository = new InMemoryProductRepository();

    await productRepository.create(makeProduct({ price: '1700' }));
    await productRepository.create(makeProduct({ price: '2500' }));

    const getManyProducts = new GetManyProducts(productRepository);
    // act
    const { products } = await getManyProducts.execute({});

    // assert
    expect(products).toBeTruthy();

    expect(products.length).toEqual(2);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ price: '1700' }),
        expect.objectContaining({ price: '2500' }),
      ]),
    );
  });
  it('should get all products when category_id is provided', async () => {
    //arrange
    const productRepository = new InMemoryProductRepository();

    await productRepository.create(makeProduct({ category_id: '123' }));
    await productRepository.create(makeProduct({ category_id: '123' }));
    await productRepository.create(makeProduct({ category_id: '5000' }));

    const getManyProducts = new GetManyProducts(productRepository);
    // act
    const { products } = await getManyProducts.execute({
      category_id: '123',
    });

    // assert
    expect(products).toBeTruthy();

    expect(products.length).toEqual(2);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category_id: '123' }),
        expect.objectContaining({ category_id: '123' }),
      ]),
    );
  });
});

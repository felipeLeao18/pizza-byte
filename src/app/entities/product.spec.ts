import { Product } from './product';

describe('Product', () => {
  it('should create product', async () => {
    const product = new Product({
      name: 'my product',
      description: 'my product description',
      banner: 'my product banner',
      category_id: 'my product category id',
      price: '350.00',
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBeDefined();
    expect(product.description).toBeDefined();
    expect(product.banner).toBeDefined();
    expect(product.price).toBeDefined();
    expect(product.category_id).toBeDefined();
    expect(product.createdAt).toEqual(expect.any(Date));
    expect(product.updatedAt).toEqual(expect.any(Date));
  });
});

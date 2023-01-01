import { IProductProps, Product } from '@app/entities/product';
import { makeCategory } from './category-factory';

type Override = Partial<IProductProps>;
const category = makeCategory();
export function makeProduct(override?: Override) {
  return new Product({
    name: 'product name',
    description: 'product description',
    banner: 'http://image.jpg',
    category_id: category.id,
    price: '1500',
    ...override,
  });
}

import { Category, ICategoryProps } from '@app/entities/category';

type Override = Partial<ICategoryProps>;
export function makeCategory(override?: Override) {
  return new Category({
    name: 'category_from_factory',
    ...override,
  });
}

import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';

interface IGetCategoriesResponse {
  categories: Category[];
}

@Injectable()
export class GetCategories {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(): Promise<IGetCategoriesResponse> {
    const categories = await this.categoryRepository.findMany();

    return { categories };
  }
}

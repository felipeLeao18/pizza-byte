import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';

interface ICreateCategoryRequest {
  name: string;
}

interface ICreateCategoryResponse {
  category: Category;
}

@Injectable()
export class CreateCategory {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(
    request: ICreateCategoryRequest,
  ): Promise<ICreateCategoryResponse> {
    const { name } = request;

    const category = new Category({ name });

    await this.categoryRepository.create(category);

    return { category };
  }
}

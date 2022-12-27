import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';

interface ICreateCategoryRequest {
  name: string;
  user?: string;
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
    console.log(request);
    const { name, user } = request;

    console.log(user);
    const category = new Category({ name });

    await this.categoryRepository.create(category);

    return { category };
  }
}

import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';
import { CategoryNotFoundError } from '../errors/category-errors';

interface IGetCategoryRequest {
  id: string;
}

interface IGetCategoryResponse {
  category: Category;
}

@Injectable()
export class GetCategoryById {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(request: IGetCategoryRequest): Promise<IGetCategoryResponse> {
    const { id } = request;

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return { category };
  }
}

import { CreateCategory } from '@app/use-cases/category/create-category';
import { GetCategories } from '@app/use-cases/category/get-categories';
import { GetCategoryById } from '@app/use-cases/category/get-category';
import { MyMiddlewareProvider } from '@infra/middlewares/middleware.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCategoryBody } from '../dtos/user/create-category-body';
import { CategoryViewModel } from '../view-models/category-view-model';

@UseInterceptors(MyMiddlewareProvider)
@Controller('categories')
export class CategoryController {
  constructor(
    private _create: CreateCategory,
    private _getById: GetCategoryById,
    private _getMany: GetCategories,
  ) {}

  @Post()
  async create(@Body() body: CreateCategoryBody) {
    const { name } = body;

    const { category } = await this._create.execute({
      name,
    });

    return { category: CategoryViewModel.toHTTP(category) };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const { category } = await this._getById.execute({
      id,
    });

    return { category: CategoryViewModel.toHTTP(category) };
  }

  @Get()
  async getMany() {
    const { categories } = await this._getMany.execute();

    return {
      categories: categories.map((category) =>
        CategoryViewModel.toHTTP(category),
      ),
    };
  }
}

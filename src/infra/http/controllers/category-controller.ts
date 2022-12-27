import { AuthenticatorRepository } from '@app/repositories/authenticator-repository';
import { CreateCategory } from '@app/use-cases/category/create-category';
import { MyMiddlewareProvider } from '@infra/middlewares/middleware.service';
import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { CreateCategoryBody } from '../dtos/user/create-category-body';
import { CategoryViewModel } from '../view-models/category-view-model';

@UseInterceptors(MyMiddlewareProvider)
@Controller('categories')
export class CategoryController {
  constructor(private _create: CreateCategory) {}

  @Post()
  async create(@Body() body: CreateCategoryBody) {
    const { name } = body;

    const { category } = await this._create.execute({
      name,
    });

    return { category: CategoryViewModel.toHTTP(category) };
  }
}

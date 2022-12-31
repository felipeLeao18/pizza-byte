import { CreateProduct } from '@app/use-cases/product/create-product';
import { MyMiddlewareProvider } from '@infra/middlewares/middleware.service';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductBody } from '../dtos/user/create-product-body';
import { ProductViewModel } from '../view-models/product-view-model';

@UseInterceptors(MyMiddlewareProvider)
@Controller('products')
export class ProductController {
  constructor(private _create: CreateProduct) {}

  @Post()
  @UseInterceptors(FileInterceptor('banner'))
  async create(@Body() body: CreateProductBody, @UploadedFile() file) {
    const { name, description, category_id, price } = body;

    const { product } = await this._create.execute({
      name,
      description,
      category_id,
      price,
      banner: file,
    });

    return { product: ProductViewModel.toHTTP(product) };
  }
}

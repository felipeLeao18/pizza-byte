import { Injectable } from '@nestjs/common';
import { Product } from '@app/entities/product';
import { ProductRepository } from '@app/repositories/product-repository';

interface IGetManyProductsRequest {
  category_id?: string;
}

interface IGetManyProductsResponse {
  products: Product[];
}

@Injectable()
export class GetManyProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    request: IGetManyProductsRequest,
  ): Promise<IGetManyProductsResponse> {
    const { category_id } = request;

    const products = await this.productRepository.getMany(category_id);

    return { products };
  }
}

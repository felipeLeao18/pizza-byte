import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@app/repositories/category-repository';
import { Product } from '@app/entities/product';
import { BucketRepository } from '@app/repositories/bucket-repository';
import { ProductRepository } from '@app/repositories/product-repository';
import { CategoryNotFoundError } from '../errors/category-errors';

interface ICreateProductRequest {
  name: string;
  description: string;
  banner: any;
  category_id: string;
  price: string;
}

interface ICreateProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(
    private categoryRepository: CategoryRepository,
    private productRepository: ProductRepository,
    private bucketRepository: BucketRepository,
  ) {}

  private bannerPlaintext: string;
  private setBannerPlaintext(plaintext: string) {
    this.bannerPlaintext = plaintext;
  }

  async execute(
    request: ICreateProductRequest,
  ): Promise<ICreateProductResponse> {
    const { name, description, price, banner, category_id } = request;

    if (category_id) {
      const category = await this.categoryRepository.findById(category_id);
      if (!category) {
        throw new CategoryNotFoundError();
      }
    }

    if (banner) {
      const { link } = (await this.bucketRepository.upload(banner)) ?? null;

      if (link) {
        this.setBannerPlaintext(link);
      }
    }

    const product = new Product({
      name,
      description,
      price,
      banner: this.bannerPlaintext ?? banner,
      category_id,
    });

    await this.productRepository.create(product);

    return { product };
  }
}

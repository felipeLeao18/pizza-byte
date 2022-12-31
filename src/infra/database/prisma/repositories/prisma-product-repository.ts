import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from '@app/repositories/product-repository';
import { Product } from '@app/entities/product';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const raw = PrismaProductMapper.toPrisma(product);

    const productDb = await this.prisma.product.create({
      data: raw,
    });

    return PrismaProductMapper.toDomain(productDb);
  }
}

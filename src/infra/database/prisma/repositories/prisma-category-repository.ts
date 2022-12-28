import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) =>
      PrismaCategoryMapper.toDomain(category),
    );
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return PrismaCategoryMapper.toDomain(category);
  }

  async create(category: Category): Promise<Category> {
    const raw = PrismaCategoryMapper.toPrisma(category);

    const categoryDb = await this.prisma.category.create({
      data: raw,
    });

    return PrismaCategoryMapper.toDomain(categoryDb);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundError extends HttpException {
  constructor() {
    super('Category not found', HttpStatus.NOT_FOUND);
  }
}

import { IsNotEmpty } from 'class-validator';

export class CreateProductBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  category_id: string;
}

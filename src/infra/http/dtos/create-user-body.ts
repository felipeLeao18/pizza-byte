import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @Length(5, 248)
  password: string;

  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  name: string;
}

import { IsNotEmpty } from 'class-validator';

export class LoginBody {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}

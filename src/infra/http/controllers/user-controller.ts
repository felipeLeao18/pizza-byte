import { SignUp } from '@app/use-cases/user/signup';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('user')
export class UserController {
  constructor(private signup: SignUp) {}

  @Post()
  async signUp(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    const { user } = await this.signup.execute({
      name,
      email,
      password,
    });

    return { user: UserViewModel.toHTTP(user) };
  }
}

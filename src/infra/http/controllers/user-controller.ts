import { GetUserLoggedInfo } from '@app/use-cases/user/get-user-logged-info';
import { Login } from '@app/use-cases/user/login';
import { SignUp } from '@app/use-cases/user/signup';
import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { CreateUserBody } from '../dtos/user/create-user-body';
import { LoginBody } from '../dtos/user/login-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('user')
export class UserController {
  constructor(
    private signup: SignUp,
    private _login: Login,
    private _getUserLoggedInfo: GetUserLoggedInfo,
  ) {}

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

  @HttpCode(200)
  @Post('/login')
  async login(@Body() body: LoginBody) {
    const { email, password } = body;
    const { user, token } = await this._login.execute({
      email,
      password,
    });

    return { user: UserViewModel.toHTTP(user), token };
  }

  @HttpCode(200)
  @Post('/me')
  async getUserLoggedInfo(@Query() query: { userId: string }) {
    const { userId } = query;
    const { user } = await this._getUserLoggedInfo.execute({
      userId,
    });

    return { user: UserViewModel.toHTTP(user) };
  }
}

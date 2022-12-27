import { GetUserByToken } from '@app/use-cases/user/get-user-by-token';
import { DatabaseModule } from '@infra/database/database.module';
import { CategoryController } from '@infra/http/controllers/category-controller';
import { HttpModule } from '@infra/http/http.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserByToken).forRoutes(CategoryController);
  }
}

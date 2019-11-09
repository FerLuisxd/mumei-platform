import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserCommandService } from './user-command.service';
import { UserCommandController } from './user-command.controller';
import { UserCommandEntity } from './user-command.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './../middlewares/auth.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([UserCommandEntity])],
  providers: [UserCommandService],
  controllers: [UserCommandController],
  exports: [UserCommandService],
})
export class UserCommandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserCommandController);
  }
}


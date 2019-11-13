import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserChatService } from './user-chat.service';
import { UserChatController } from './user-chat.controller';
import { UserChatEntity } from './user-chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middlewares/auth.middleware';

import { UserEntity} from "../user/user.entity";
import { UserController} from "../user/user.controller";
import {  UserService} from "../user/user.service";



@Module({
  imports: [TypeOrmModule.forFeature([UserChatEntity, UserEntity])],
  providers: [UserChatService, UserService],
  controllers: [UserChatController, UserController],
  exports: [UserChatService, UserService, UserChatModule],
})
export class UserChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserChatController);
  }
}


import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CommandEntity } from './command.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommandEntity])],
  providers: [CommandService],
  controllers: [CommandController],
  exports: [CommandService],
})
export class CommandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CommandController);
  }
}


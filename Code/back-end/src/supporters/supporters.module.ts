import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './../middlewares/auth.middleware';
import { SupportersController } from './supporters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportersEntity } from './supporters.entity';
import { SupportersService } from './supporters.service';

@Module({
    imports: [TypeOrmModule.forFeature([SupportersEntity])],
    providers: [SupportersService],
    controllers: [SupportersController],
    exports: [SupportersService],
})
export class SupportersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(SupportersController);
    }
}

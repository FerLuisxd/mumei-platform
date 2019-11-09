import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from './business.entity';
import { AuthMiddleware } from './../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  providers: [BusinessService],
  controllers: [BusinessController],
  exports: [BusinessService],
})
export class BusinessModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BusinessController);
  }
}

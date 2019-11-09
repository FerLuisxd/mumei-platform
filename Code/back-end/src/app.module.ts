import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
 import { AuthModule } from './auth/auth.module';
 import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
/*import { CommandController } from './command/command.controller';
import { CommandService } from './command/command.service';
import { CommandModule } from './command/command.module';
import { CommandEntity } from './command/command.entity';*/
/*import { BusinessController } from './business/business.controller';
import { BusinessModule } from './business/business.module';*/
/*import { SupportersController } from './supporters/supporters.controller';
import { SupportersService } from './supporters/supporters.service';
import { SupportersModule } from './supporters/supporters.module';*/


@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

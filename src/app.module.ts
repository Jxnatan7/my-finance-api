import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './core/entity/user.entity';
import { Wallet } from './core/entity/wallet.entity';
import { UserWallet } from './core/entity/user_wallet.entity';
import { Transaction } from './core/entity/transaction.entity';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { UserController } from './http/rest/controller/user.controller';
import { UserService } from './core/service/user.service';
import { UserTypeOrmRepository } from './persistence/repository/user.repository';

const TYPEORM_MODULE_OPTIONS = {
  type: process.env.TYPEORM_CONNECTIONS,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, Wallet, UserWallet, Transaction],
  synchronize: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(TYPEORM_MODULE_OPTIONS as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
})
export class AppModule {}

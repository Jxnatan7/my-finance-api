import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './core/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './http/rest/controller/user.controller';
import { UserService } from './core/service/user.service';
import { UserTypeOrmRepository } from './persistence/repository/user.repository';
import { AuthModule } from './auth/auth.module';
import { WalletController } from './http/rest/controller/wallet.controller';
import { WalletService } from './core/service/wallet.service';
import { WalletTypeOrmRepository } from './persistence/repository/wallet.repository';
import { Wallet } from './core/entity/wallet.entity';
import { UserWallet } from './core/entity/user_wallet.entity';
import { TransactionController } from './http/rest/controller/transaction.controller';
import { TransactionService } from './core/service/transaction.service';
import { TransactionTypeOrmRepository } from './persistence/repository/transaction.repository';
import { Transaction } from './core/entity/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User, Wallet, UserWallet, Transaction]),
    AuthModule,
  ],
  controllers: [UserController, WalletController, TransactionController],
  providers: [
    UserService,
    WalletService,
    TransactionService,
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
    {
      provide: 'IWalletRepository',
      useClass: WalletTypeOrmRepository,
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionTypeOrmRepository,
    },
  ],
})
export class AppModule {}

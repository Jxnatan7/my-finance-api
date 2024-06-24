import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionRepository } from '../../core/repository/transaction.repository';
import { Transaction } from '../../core/entity/transaction.entity';
import { UserWallet } from '../../core/entity/user_wallet.entity';
import { CreateTransactionRequest } from '../../http/rest/dto/request/create-transaction-request.dto';
import { Wallet } from '../../core/entity/wallet.entity';
import { MessagesHelper } from '../../http/rest/helpers/messages.helper';
import { WalletTransactionsResponse } from '../../http/rest/dto/response/wallet-transactions-response.dto';
import { UserJwt } from '../../http/rest/helpers/user.decorator';

@Injectable()
export class TransactionTypeOrmRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionTypeOrmRepo: Repository<Transaction>,
    @InjectRepository(UserWallet)
    private userWalletTypeOrmRepo: Repository<UserWallet>,
    @InjectRepository(Wallet)
    private walletTypeOrmRepo: Repository<Wallet>,
  ) {}

  public async create(
    createWalletRequest: CreateTransactionRequest,
    user: UserJwt,
  ): Promise<Transaction> {
    return this.transactionTypeOrmRepo.create({
      ...createWalletRequest,
      user_id: user.id,
    });
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return await this.transactionTypeOrmRepo.save(transaction);
  }

  public async findAll(userId: number): Promise<Transaction[]> {
    return this.transactionTypeOrmRepo.find({
      where: { user_id: userId },
    });
  }

  public async findAllByWalletId(
    walletId: number,
  ): Promise<WalletTransactionsResponse> {
    const wallet: Wallet = await this.walletTypeOrmRepo.findOne({
      where: { id: walletId },
    });

    if (!wallet) {
      throw new NotFoundException({
        message: MessagesHelper.WALLET_NOT_FOUND,
      });
    }

    const transactions: Transaction[] = await this.transactionTypeOrmRepo.find({
      where: { wallet_id: walletId },
    });

    return new WalletTransactionsResponse(wallet, transactions);
  }

  public async findById(id: number): Promise<Transaction> {
    const transaction = await this.transactionTypeOrmRepo.findOne({
      where: { id },
    });

    if (!transaction) {
      return;
    }

    return transaction;
  }

  public async delete(id: number): Promise<void> {
    await this.transactionTypeOrmRepo
      .createQueryBuilder()
      .update(Transaction)
      .set({ deleted_at: `${new Date()}` })
      .where('id = :id', { id })
      .execute();
  }
}

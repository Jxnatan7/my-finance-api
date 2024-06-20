import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionRepository } from '../../core/repository/transaction.repository';
import { Transaction } from '../../core/entity/transaction.entity';
import { UserWallet } from '../../core/entity/user_wallet.entity';
import { CreateTransactionRequest } from '../../http/rest/dto/create_transaction_request.dto';

@Injectable()
export class TransactionTypeOrmRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionTypeOrmRepo: Repository<Transaction>,
    @InjectRepository(UserWallet)
    private userWalletTypeOrmRepo: Repository<UserWallet>,
  ) {}

  public async create(
    createWalletRequest: CreateTransactionRequest,
  ): Promise<Transaction> {
    const transaction: Transaction =
      this.transactionTypeOrmRepo.create(createWalletRequest);
    return await this.transactionTypeOrmRepo.save(transaction);
  }

  public async findAll(userId: number): Promise<Transaction[]> {
    const userWallets = await this.userWalletTypeOrmRepo.find({
      where: { user: { id: userId } },
      relations: ['wallet'],
    });

    const walletIds = userWallets.map((userWallet) => userWallet.wallet.id);

    if (walletIds.length === 0) {
      return [];
    }

    return this.transactionTypeOrmRepo.find({
      where: walletIds.map((id) => ({ wallet: { id } })),
      relations: ['wallet'],
    });
  }

  public async findAllByWalletId(walletId: number): Promise<Transaction[]> {
    const transactions = await this.transactionTypeOrmRepo.find({
      where: { wallet_id: walletId },
    });

    if (transactions.length === 0) {
      return [];
    }

    return transactions;
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

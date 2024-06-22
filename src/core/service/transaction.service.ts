import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionRepository } from '../repository/transaction.repository';
import { CreateTransactionRequest } from '../../http/rest/dto/request/create-transaction-request.dto';
import { Transaction, TransactionType } from '../entity/transaction.entity';
import { WalletTransactionsResponse } from '../../http/rest/dto/response/wallet-transactions-response.dto';
import { IWalletRepository } from '../repository/wallet.repository';
import { Wallet } from '../entity/wallet.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('IWalletRepository')
    private readonly walletRepository: IWalletRepository,
  ) {}
  public async create(
    createTransactionRequest: CreateTransactionRequest,
  ): Promise<Transaction> {
    const wallet = await this.findWallet(createTransactionRequest.walletId);

    const transaction = await this.transactionRepository.create(
      createTransactionRequest,
    );
    const transactionSaved = await this.transactionRepository.save(transaction);

    this.updateWalletBalance(wallet, transactionSaved);
    await this.walletRepository.save(wallet);

    return transactionSaved;
  }

  private async findWallet(walletId: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  private updateWalletBalance(wallet: Wallet, transaction: Transaction): void {
    const walletBalance = Number(wallet.balance);
    const transactionValue = Number(transaction.value);
    if (transaction.type === TransactionType.Credit) {
      wallet.balance = walletBalance + transactionValue;
    } else if (transaction.type === TransactionType.Debit) {
      wallet.balance = walletBalance - transactionValue;
    }
  }

  public async findAll(userId: number): Promise<Transaction[]> {
    return await this.transactionRepository.findAll(userId);
  }

  public async findAllByWalletId(
    walletId: number,
  ): Promise<WalletTransactionsResponse> {
    return await this.transactionRepository.findAllByWalletId(walletId);
  }

  public async findById(id: number): Promise<Transaction> {
    return await this.transactionRepository.findById(id);
  }

  public async delete(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}

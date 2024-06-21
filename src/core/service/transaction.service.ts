import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionRepository } from '../repository/transaction.repository';
import { CreateTransactionRequest } from '../../http/rest/dto/request/create-transaction-request.dto';
import { Transaction, TransactionType } from '../entity/transaction.entity';
import { WalletTransactionsResponse } from '../../http/rest/dto/response/wallet-transactions-response.dto';
import { IWalletRepository } from '../repository/wallet.repository';
import { WalletService } from './wallet.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('ITransactionRepository')
    private readonly walletRepository: IWalletRepository,
    private readonly walletService: WalletService,
  ) {}

  public async create(
    createTransactionRequest: CreateTransactionRequest,
  ): Promise<Transaction> {
    const wallet = await this.walletService.findById(
      createTransactionRequest.walletId,
    );

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const transaction = await this.transactionRepository.create(
      createTransactionRequest,
    );

    const transactionSaved = await this.transactionRepository.save(transaction);

    if (transactionSaved.type === TransactionType.Credit) {
      wallet.balance += transactionSaved.value;
    } else if (transactionSaved.type === TransactionType.Debit) {
      wallet.balance -= transactionSaved.value;
    }

    await this.walletRepository.update(wallet);
    return transaction;
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

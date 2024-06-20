import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../repository/transaction.repository';
import { CreateTransactionRequest } from '../../http/rest/dto/request/create-transaction-request.dto';
import { Transaction } from '../entity/transaction.entity';
import { WalletTransactionsResponse } from '../../http/rest/dto/response/wallet-transactions-response.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  public async create(createWalletRequest: CreateTransactionRequest) {
    return await this.transactionRepository.create(createWalletRequest);
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

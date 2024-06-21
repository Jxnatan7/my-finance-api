import { Transaction } from '../entity/transaction.entity';
import { CreateTransactionRequest } from '../../http/rest/dto/request/create-transaction-request.dto';
import { WalletTransactionsResponse } from '../../http/rest/dto/response/wallet-transactions-response.dto';

export interface ITransactionRepository {
  create(createWalletRequest: CreateTransactionRequest): Promise<Transaction>;

  save(transaction: Transaction): Promise<Transaction>;

  findAll(userId: number): Promise<Transaction[]>;

  findAllByWalletId(walletId: number): Promise<WalletTransactionsResponse>;

  findById(id: number): Promise<Transaction>;

  delete(id: number): Promise<void>;
}

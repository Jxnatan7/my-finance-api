import { Transaction } from '../entity/transaction.entity';
import { CreateTransactionRequest } from '../../http/rest/dto/create_transaction_request.dto';

export interface ITransactionRepository {
  create(createWalletRequest: CreateTransactionRequest): Promise<Transaction>;

  findAll(userId: number): Promise<Transaction[]>;

  findAllByWalletId(walletId: number): Promise<Transaction[]>;

  findById(id: number): Promise<Transaction>;

  delete(id: number): Promise<void>;
}

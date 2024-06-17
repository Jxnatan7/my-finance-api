import { Transaction } from '../entity/transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<void>;
}

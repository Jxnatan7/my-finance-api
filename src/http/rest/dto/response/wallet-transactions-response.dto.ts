import { Wallet } from '../../../../core/entity/wallet.entity';
import { Transaction } from '../../../../core/entity/transaction.entity';

export class WalletTransactionsResponse {
  wallet: Wallet;
  transactions: Transaction[];

  constructor(wallet: Wallet, transactions: Transaction[]) {
    this.wallet = wallet;
    this.transactions = transactions;
  }
}

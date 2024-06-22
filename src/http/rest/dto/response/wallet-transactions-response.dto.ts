import { Wallet } from '../../../../core/entity/wallet.entity';
import { Transaction } from '../../../../core/entity/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class WalletTransactionsResponse {
  @ApiProperty()
  wallet: Wallet;

  @ApiProperty()
  transactions: Transaction[];

  constructor(wallet: Wallet, transactions: Transaction[]) {
    this.wallet = wallet;
    this.transactions = transactions;
  }
}

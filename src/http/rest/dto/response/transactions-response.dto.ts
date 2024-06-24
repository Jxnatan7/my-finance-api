import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../../../../core/entity/transaction.entity';
import { TotalCreditsAndDebits } from '../../../../core/service/transaction.service';

export class TransactionsResponse {
  @ApiProperty()
  transactions: Transaction[];

  @ApiProperty()
  totalCredits: number;

  @ApiProperty()
  totalDebits: number;

  constructor(
    transactions: Transaction[],
    totalCreditsAndDebits: TotalCreditsAndDebits,
  ) {
    this.transactions = transactions;
    this.totalCredits = totalCreditsAndDebits.totalCredits;
    this.totalDebits = totalCreditsAndDebits.totalDebits;
  }
}

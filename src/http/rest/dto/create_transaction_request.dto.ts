import { IsEnum, IsNotEmpty } from 'class-validator';
import { TransactionType } from '../../../core/entity/transaction.entity';
import { Expose } from 'class-transformer';

export class CreateTransactionRequest {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @Expose({ name: 'wallet_id' })
  walletId: number;
}

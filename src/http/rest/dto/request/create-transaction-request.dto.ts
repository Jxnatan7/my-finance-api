import { IsEnum, IsNotEmpty } from 'class-validator';
import { TransactionType } from '../../../../core/entity/transaction.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionRequest {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose({ name: 'wallet_id' })
  walletId: number;
}

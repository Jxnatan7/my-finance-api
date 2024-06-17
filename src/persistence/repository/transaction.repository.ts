import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionRepository } from '../../core/repository/transaction.repository';
import { Transaction } from '../../core/entity/transaction.entity';

@Injectable()
export class TransactionTypeOrmRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private typeOrmRepo: Repository<Transaction>,
  ) {}

  async create(transaction: Transaction): Promise<void> {
    await this.typeOrmRepo.save(transaction);
  }
}

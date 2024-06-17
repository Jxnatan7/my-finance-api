import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../../core/entity/wallet.entity';
import { IWalletRepository } from '../../core/repository/wallet.repository';

@Injectable()
export class WalletTypeOrmRepository implements IWalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private typeOrmRepo: Repository<Wallet>,
  ) {}

  async create(wallet: Wallet): Promise<void> {
    await this.typeOrmRepo.save(wallet);
  }
}

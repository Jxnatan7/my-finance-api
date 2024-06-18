import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../../core/entity/wallet.entity';
import { IWalletRepository } from '../../core/repository/wallet.repository';
import { CreateWalletRequest } from '../../http/rest/dto/create_wallet_request.dto';

@Injectable()
export class WalletTypeOrmRepository implements IWalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private typeOrmRepo: Repository<Wallet>,
  ) {}

  async create(
    createWalletRequest: CreateWalletRequest,
    userId: number,
  ): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.name = createWalletRequest.name;
    return await this.typeOrmRepo.save(wallet);
  }
}

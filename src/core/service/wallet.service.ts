import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../repository/wallet.repository';
import { CreateWalletRequest } from '../../http/rest/dto/create_wallet_request.dto';
import { Wallet } from '../entity/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @Inject('IWalletRepository')
    private readonly walletRepository: IWalletRepository,
  ) {}

  public async create(
    createWalletRequest: CreateWalletRequest,
    userId: number,
  ) {
    return await this.walletRepository.create(createWalletRequest, userId);
  }

  public async findAll(userId: number): Promise<Wallet[]> {
    return await this.walletRepository.findAll(userId);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../repository/wallet.repository';
import { Wallet } from '../entity/wallet.entity';
import { CreateWalletRequest } from '../../http/rest/dto/request/create-wallet-request.dto';

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

  public async findById(id: number): Promise<Wallet> {
    return await this.walletRepository.findById(id);
  }

  public async delete(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}

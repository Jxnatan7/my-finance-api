import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { IWalletRepository } from '../repository/wallet.repository';
import { CreateWalletRequest } from '../../http/rest/dto/create_wallet_request.dto';

@Injectable()
export class WalletService {
  constructor(
    @Inject('IWalletRepository')
    private readonly walletRepository: IWalletRepository,
  ) {}

  async create(createWalletRequest: CreateWalletRequest, userId: number) {
    return await this.walletRepository.create(createWalletRequest, userId);
  }

  // async findById(id: number): Promise<User | null> {
  //   return await this.walletRepository.findById(id);
  // }
}

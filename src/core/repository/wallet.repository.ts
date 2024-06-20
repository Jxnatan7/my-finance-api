import { CreateWalletRequest } from '../../http/rest/dto/create_wallet_request.dto';
import { Wallet } from '../entity/wallet.entity';

export interface IWalletRepository {
  create(
    createWalletRequest: CreateWalletRequest,
    userId: number,
  ): Promise<Wallet>;

  findAll(userId: number): Promise<Wallet[]>;
}

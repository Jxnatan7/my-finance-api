import { Wallet } from '../entity/wallet.entity';
import { CreateWalletRequest } from '../../http/rest/dto/request/create-wallet-request.dto';

export interface IWalletRepository {
  create(
    createWalletRequest: CreateWalletRequest,
    userId: number,
  ): Promise<Wallet>;

  save(wallet: Wallet): Promise<Wallet>;

  update(wallet: Wallet): Promise<Wallet>;

  findAll(userId: number): Promise<Wallet[]>;

  findById(id: number): Promise<Wallet>;

  delete(id: number): Promise<void>;
}

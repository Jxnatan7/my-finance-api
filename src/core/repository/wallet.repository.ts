import { Wallet } from '../entity/wallet.entity';

export interface IWalletRepository {
  create(wallet: Wallet): Promise<void>;
}

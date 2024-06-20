import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../../core/entity/wallet.entity';
import { IWalletRepository } from '../../core/repository/wallet.repository';
import { CreateWalletRequest } from '../../http/rest/dto/create_wallet_request.dto';
import { UserWallet } from '../../core/entity/user_wallet.entity';

@Injectable()
export class WalletTypeOrmRepository implements IWalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private walletTypeOrmRepo: Repository<Wallet>,
    @InjectRepository(UserWallet)
    private userWalletTypeOrmRepo: Repository<UserWallet>,
  ) {}

  public async create(
    createWalletRequest: CreateWalletRequest,
    userId: number,
  ): Promise<Wallet> {
    if (!createWalletRequest.name) {
      return;
    }

    let wallet = this.walletTypeOrmRepo.create({
      name: createWalletRequest.name,
      balance: 0,
    });

    wallet = await this.walletTypeOrmRepo.save(wallet);

    await this.createUserWalletAssoc(userId, wallet.id);

    return wallet;
  }

  private async createUserWalletAssoc(
    userId: number,
    walletId: number,
  ): Promise<void> {
    const userWallet: UserWallet = this.userWalletTypeOrmRepo.create({
      user_id: userId,
      wallet_id: walletId,
    });

    await this.userWalletTypeOrmRepo.save(userWallet);
  }

  public async findAll(userId: number): Promise<Wallet[]> {
    if (!userId) {
      return;
    }

    const userWallets: UserWallet[] = await this.userWalletTypeOrmRepo.find({
      where: { user: { id: userId } },
      relations: ['wallet'],
    });

    return userWallets.map((userWallet: UserWallet) => userWallet.wallet);
  }

  public async findById(id: number): Promise<Wallet> {
    const wallet = await this.walletTypeOrmRepo.findOne({ where: { id } });

    if (!wallet) {
      return;
    }

    return wallet;
  }

  public async delete(id: number): Promise<void> {
    await this.walletTypeOrmRepo
      .createQueryBuilder()
      .update(Wallet)
      .set({ deleted_at: `${new Date()}` })
      .where('id = :id', { id })
      .execute();
  }
}

import { getConnection, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../../core/entity/wallet.entity';
import { IWalletRepository } from '../../core/repository/wallet.repository';
import { UserWallet } from '../../core/entity/user_wallet.entity';
import { CreateWalletRequest } from '../../http/rest/dto/request/create-wallet-request.dto';
import { Transaction } from '../../core/entity/transaction.entity';

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

  public async save(wallet: Wallet): Promise<Wallet> {
    return await this.walletTypeOrmRepo.save(wallet);
  }

  public async update(wallet: Wallet): Promise<Wallet> {
    await this.walletTypeOrmRepo.update(wallet.id, wallet);
    return await this.walletTypeOrmRepo.findOne({ where: { id: wallet.id } });
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
      where: { user: { id: userId }, wallet: { deleted_at: null } },
      relations: ['wallet'],
    });

    return userWallets
      .filter((userWallet) => userWallet.wallet !== null)
      .map((userWallet) => userWallet.wallet);
  }

  public async findById(id: number): Promise<Wallet> {
    const wallet = await this.walletTypeOrmRepo.findOne({ where: { id } });

    if (!wallet) {
      return;
    }

    return wallet;
  }

  public async delete(id: number): Promise<void> {
    const now = new Date().toString();

    await this.walletTypeOrmRepo.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.update(Wallet, id, {
          deleted_at: now,
        });

        await transactionalEntityManager.update(
          Transaction,
          { wallet_id: id },
          { deleted_at: now },
        );
      },
    );
  }
}

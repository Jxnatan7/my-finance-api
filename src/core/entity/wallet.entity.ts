import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserWallet } from './user_wallet.entity';
import { Transaction } from './transaction.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => UserWallet, userWallet => userWallet.wallet)
  userWallets: UserWallet[];

  @OneToMany(() => Transaction, transaction => transaction.wallet)
  transactions: Transaction[];
}

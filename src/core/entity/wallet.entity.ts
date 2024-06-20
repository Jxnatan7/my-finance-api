import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserWallet } from './user_wallet.entity';
import { Transaction } from './transaction.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @OneToMany(() => UserWallet, (userWallet) => userWallet.wallet)
  userWallets: UserWallet[];

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;
}

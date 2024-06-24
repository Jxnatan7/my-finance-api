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

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => UserWallet, (userWallet) => userWallet.wallet)
  userWallets: UserWallet[];

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deleted_at: string;
}

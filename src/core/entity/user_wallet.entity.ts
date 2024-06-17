import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Wallet } from './wallet.entity';

@Entity('user_wallet')
export class UserWallet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.userWallets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Wallet, (wallet) => wallet.userWallets)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column()
  user_id: number;

  @Column()
  wallet_id: number;
}

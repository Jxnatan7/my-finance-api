import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from './user.entity';

export enum TransactionType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ name: 'value', type: 'decimal' })
  value: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @Column()
  wallet_id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deleted_at: string;
}

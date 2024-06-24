import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { UserWallet } from './user_wallet.entity';
import { hashSync } from 'bcrypt';
import { Transaction } from './transaction.entity';

@Unique(['email'])
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: string;

  @OneToMany(() => UserWallet, (userWallet) => userWallet.user)
  userWallets: UserWallet[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

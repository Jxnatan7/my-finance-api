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

@Unique(['email'])
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;

  @OneToMany(() => UserWallet, (userWallet) => userWallet.user)
  userWallets: UserWallet[];

  // @BeforeInsert()
  // hashPassword() {
  //   this.password = hashSync(this.password, 10);
  // }
}

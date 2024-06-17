import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/entity/user.entity';
import { IUserRepository } from '../../core/repository/user.repository';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>,
  ) {}

  async findById(id: number) {
    const user = await this.typeOrmRepo.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return user;
  }
}

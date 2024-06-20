import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/entity/user.entity';
import { IUserRepository } from '../../core/repository/user.repository';
import { CreateUserRequest } from '../../http/rest/dto/create_user_request.dto';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>,
  ) {}

  public async create(createUserRequest: CreateUserRequest): Promise<User> {
    const existingUser = await this.typeOrmRepo.findOne({
      where: { email: createUserRequest.email },
    });

    if (existingUser) {
      return;
    }

    const user: User = this.typeOrmRepo.create(createUserRequest);
    return await this.typeOrmRepo.save(user);
  }

  public async findById(id: number): Promise<User> {
    const user = await this.typeOrmRepo.findOne({ where: { id } });

    if (!user) {
      return;
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.typeOrmRepo.findOne({ where: { email } });

    if (!user) {
      return;
    }

    return user;
  }
}

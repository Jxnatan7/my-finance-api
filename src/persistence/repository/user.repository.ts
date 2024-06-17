import { Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
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

  async store(createUserRequest: CreateUserRequest): Promise<User> {
    const existingUser = await this.typeOrmRepo.findOne({
      where: { email: createUserRequest.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.typeOrmRepo.create(createUserRequest);
    return await this.typeOrmRepo.save(user);
  }

  async findById(id: number) {
    const user = await this.typeOrmRepo.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return user;
  }
}

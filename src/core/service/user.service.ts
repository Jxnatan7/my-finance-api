import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';
import { CreateUserRequest } from '../../http/rest/dto/create_user_request.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserRequest: CreateUserRequest) {
    return await this.userRepository.create(createUserRequest);
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';
import { CreateUserRequest } from '../../http/rest/dto/request/create-user-request.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async create(createUserRequest: CreateUserRequest) {
    return await this.userRepository.create(createUserRequest);
  }

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }
}

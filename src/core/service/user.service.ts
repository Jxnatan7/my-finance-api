import { Inject } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';

export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}

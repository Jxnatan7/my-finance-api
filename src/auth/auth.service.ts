import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../core/repository/user.repository';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return;
    }

    return user;
  }
}

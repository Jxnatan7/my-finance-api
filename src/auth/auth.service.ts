import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../core/repository/user.repository';
import { compareSync } from 'bcrypt';
import { User } from '../core/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
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

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

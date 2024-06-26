import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagesHelper } from '../../http/rest/helpers/messages.helper';
import { User } from '../../core/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException({
        message: MessagesHelper.PASSWORD_OR_EMAIL_INVALID,
      });
    }

    return user;
  }
}

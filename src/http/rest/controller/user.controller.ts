import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from '../../../core/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { SimpleUserResponse } from '../dto/response/simple-user-response.dto';
import { User, UserJwt } from '../helpers/user.decorator';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(
    @User() userByToken: UserJwt,
  ): Promise<SimpleUserResponse | NotFoundException> {
    const user = await this.userService.findById(userByToken.id);

    if (!user) {
      throw new NotFoundException(`User with id ${userByToken.id} not found`);
    }

    return new SimpleUserResponse(user);
  }
}

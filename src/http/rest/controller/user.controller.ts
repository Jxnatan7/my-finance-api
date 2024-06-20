import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../../core/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { SimpleUserResponse } from '../dto/response/simple-user-response.dto';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(
    @Param('id') id: number,
  ): Promise<SimpleUserResponse | NotFoundException> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return new SimpleUserResponse(user);
  }
}

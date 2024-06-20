import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../../core/service/user.service';
import { SimpleUserResponse } from '../dto/simple_user_response.dto';
import { AuthGuard } from '@nestjs/passport';

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

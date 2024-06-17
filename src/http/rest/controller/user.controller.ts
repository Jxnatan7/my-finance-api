import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { User } from '../../../core/entity/user.entity';
import { UserService } from '../../../core/service/user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User | NotFoundException> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}

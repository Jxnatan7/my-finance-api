import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { User } from '../../../core/entity/user.entity';
import { UserService } from '../../../core/service/user.service';
import { CreateUserRequest } from '../dto/create_user_request.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async store(@Body() createUserRequest: CreateUserRequest): Promise<User> {
    return await this.userService.store(createUserRequest);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User | NotFoundException> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}

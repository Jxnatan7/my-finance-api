import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../../core/service/user.service';
import { CreateUserRequest } from '../dto/create_user_request.dto';
import { SimpleUserResponse } from '../dto/simple_user_response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async store(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<SimpleUserResponse> {
    const user = await this.userService.create(createUserRequest);
    if (!user) {
      throw new ConflictException('Email is already in use');
    }
    return new SimpleUserResponse(user);
  }

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

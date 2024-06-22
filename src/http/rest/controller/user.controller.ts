import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserService } from '../../../core/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { SimpleUserResponse } from '../dto/response/simple-user-response.dto';
import { User, UserJwt } from '../helpers/user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: SimpleUserResponse,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
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

import { Body, ConflictException, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserRequest } from '../http/rest/dto/create_user_request.dto';
import { SimpleUserResponse } from '../http/rest/dto/simple_user_response.dto';
import { UserService } from '../core/service/user.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('/register')
  public async register(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<SimpleUserResponse> {
    const user = await this.userService.create(createUserRequest);
    if (!user) {
      throw new ConflictException('Email is already in use');
    }
    return new SimpleUserResponse(user);
  }
}

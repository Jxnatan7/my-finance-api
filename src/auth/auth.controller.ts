import {
  Body,
  ConflictException,
  Controller, HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../core/service/user.service';
import { CreateUserRequest } from '../http/rest/dto/request/create-user-request.dto';
import { SimpleUserResponse } from '../http/rest/dto/response/simple-user-response.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
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

import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../helpers/regexHelper';
import { MessagesHelper } from '../../helpers/messages.helper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}

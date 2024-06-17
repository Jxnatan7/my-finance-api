import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../helpers/regexHelper';
import { MessagesHelper } from '../helpers/messages.helper';

export class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}

import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegexHelper } from '../helpers/regex.helper';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password)
  password: string;
}

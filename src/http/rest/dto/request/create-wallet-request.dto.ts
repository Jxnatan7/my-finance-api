import { IsNotEmpty } from 'class-validator';

export class CreateWalletRequest {
  @IsNotEmpty()
  name: string;
}

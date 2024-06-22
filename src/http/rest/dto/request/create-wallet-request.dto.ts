import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

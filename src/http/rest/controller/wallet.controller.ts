import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWalletRequest } from '../dto/create_wallet_request.dto';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from '../../../core/service/wallet.service';
import { User } from '../helpers/user.decorator';

@Controller('api/v1/wallet')
@UseGuards(AuthGuard('jwt'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(
    @Body() createWalletRequest: CreateWalletRequest,
    @User() user: any,
  ) {
    return await this.walletService.create(createWalletRequest, user.id);
  }
}

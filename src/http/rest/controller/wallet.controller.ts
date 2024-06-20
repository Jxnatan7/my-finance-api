import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateWalletRequest } from '../dto/create_wallet_request.dto';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from '../../../core/service/wallet.service';
import { User } from '../helpers/user.decorator';
import { Wallet } from '../../../core/entity/wallet.entity';

type UserJwt = { id: number; email: string };

@Controller('api/v1/wallet')
@UseGuards(AuthGuard('jwt'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(
    @Body() createWalletRequest: CreateWalletRequest,
    @User() user: UserJwt,
  ): Promise<Wallet> {
    return await this.walletService.create(createWalletRequest, user?.id);
  }

  @Get('all')
  async findAll(@User() user: UserJwt): Promise<Wallet[]> {
    return await this.walletService.findAll(user?.id);
  }
}

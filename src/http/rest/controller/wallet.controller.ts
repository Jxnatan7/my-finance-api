import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from '../../../core/service/wallet.service';
import { User } from '../helpers/user.decorator';
import { Wallet } from '../../../core/entity/wallet.entity';
import { CreateWalletRequest } from '../dto/request/create-wallet-request.dto';

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

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Wallet | NotFoundException> {
    const wallet = await this.walletService.findById(id);

    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${id} not found`);
    }

    return wallet;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.walletService.delete(id);
  }
}

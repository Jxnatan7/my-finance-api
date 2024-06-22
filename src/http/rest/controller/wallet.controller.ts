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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from '../../../core/service/wallet.service';
import { User, UserJwt } from '../helpers/user.decorator';
import { Wallet } from '../../../core/entity/wallet.entity';
import { CreateWalletRequest } from '../dto/request/create-wallet-request.dto';

@ApiTags('wallet')
@ApiBearerAuth()
@Controller('api/v1/wallet')
@UseGuards(AuthGuard('jwt'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiCreatedResponse({
    description: 'Wallet created successfully',
    type: Wallet,
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async create(
    @Body() createWalletRequest: CreateWalletRequest,
    @User() user: UserJwt,
  ): Promise<Wallet> {
    return await this.walletService.create(createWalletRequest, user?.id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all wallets' })
  @ApiResponse({ status: 200, description: 'List of wallets', type: [Wallet] })
  async findAll(@User() user: UserJwt): Promise<Wallet[]> {
    return await this.walletService.findAll(user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by ID' })
  @ApiResponse({ status: 200, description: 'Wallet found', type: Wallet })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  async findById(@Param('id') id: number): Promise<Wallet | NotFoundException> {
    const wallet = await this.walletService.findById(id);

    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${id} not found`);
    }

    return wallet;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wallet by ID' })
  @ApiResponse({ status: 200, description: 'Wallet deleted successfully' })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.walletService.delete(id);
  }
}

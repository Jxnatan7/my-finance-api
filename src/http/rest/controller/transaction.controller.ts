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
import { Transaction } from '../../../core/entity/transaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../helpers/user.decorator';
import { TransactionService } from '../../../core/service/transaction.service';
import { CreateTransactionRequest } from '../dto/request/create-transaction-request.dto';
import { WalletTransactionsResponse } from '../dto/response/wallet-transactions-response.dto';

type UserJwt = { id: number; email: string };

@Controller('api/v1/transaction')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionRequest: CreateTransactionRequest,
  ): Promise<Transaction> {
    return await this.transactionService.create(createTransactionRequest);
  }

  @Get('all')
  async findAll(@User() user: UserJwt): Promise<Transaction[]> {
    return await this.transactionService.findAll(user?.id);
  }

  @Get('all/:walletId')
  async findAllByWalletId(
    @Param('walletId') walletId: number,
  ): Promise<WalletTransactionsResponse> {
    return await this.transactionService.findAllByWalletId(walletId);
  }

  @Get(':id')
  async findById(
    @Param('id') id: number,
  ): Promise<Transaction | NotFoundException> {
    const transaction = await this.transactionService.findById(id);

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.transactionService.delete(id);
  }
}

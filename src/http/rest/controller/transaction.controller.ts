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
import { Transaction } from '../../../core/entity/transaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../helpers/user.decorator';
import { TransactionService } from '../../../core/service/transaction.service';
import { CreateTransactionRequest } from '../dto/request/create-transaction-request.dto';
import { WalletTransactionsResponse } from '../dto/response/wallet-transactions-response.dto';

type UserJwt = { id: number; email: string };

@ApiTags('transaction')
@ApiBearerAuth()
@Controller('api/v1/transaction')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created successfully',
    type: Transaction,
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async create(
    @Body() createTransactionRequest: CreateTransactionRequest,
    @User() user: UserJwt,
  ): Promise<Transaction> {
    return await this.transactionService.create(createTransactionRequest, user);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions',
    type: [Transaction],
  })
  async findAll(@User() user: UserJwt): Promise<Transaction[]> {
    return await this.transactionService.findAll(user?.id);
  }

  @Get('all/:walletId')
  @ApiOperation({ summary: 'Get all transactions by wallet ID' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions for the specified wallet',
    type: WalletTransactionsResponse,
  })
  async findAllByWalletId(
    @Param('walletId') walletId: number,
  ): Promise<WalletTransactionsResponse> {
    return await this.transactionService.findAllByWalletId(walletId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found',
    type: Transaction,
  })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
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
  @ApiOperation({ summary: 'Delete transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.transactionService.delete(id);
  }
}
